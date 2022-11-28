import { ChangeEvent, useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Button, Input, Popconfirm, Radio, Space } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// models
import { SingleOption } from '../../models';

interface SingleOptionsProps {
  correct: SingleOption['value'];
  onChangeCorrect: (correct: SingleOption['value']) => void;
  value?: SingleOption[];
  onChange?: (value: SingleOptionsProps['value']) => void;
}

const SingleOptions = ({ correct, onChangeCorrect, value, onChange }: SingleOptionsProps) => {
  const [optionAns, setOptionAns] = useState<SingleOption['ans']>('');

  const handleChangeOptionAns = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOptionAns(e.target.value);
  };
  const handleChangeCorrectOption = (e: RadioChangeEvent) => {
    const correct = e.target.value;
    onChangeCorrect(correct);
  };
  const handleAddOption = () => {
    const newOption: SingleOption = {
      ans: optionAns,
      value: Date.now().toString(),
    };
    onChange?.([...value!, newOption]);
    setOptionAns('');
  };
  const handleRemoveOption = (optionValue: SingleOption['value']) => {
    if (optionValue === correct) {
      onChangeCorrect('');
    }

    const optionsFiltered = value?.filter((option) => option.value !== optionValue);
    onChange?.([...optionsFiltered!]);
  };
  return (
    <Space direction="vertical" size="middle">
      <Input.TextArea
        value={optionAns}
        showCount
        allowClear
        maxLength={100}
        autoSize={{ minRows: 1, maxRows: 3 }}
        placeholder="Describe your options here..."
        onChange={handleChangeOptionAns}
      />
      <Space direction="vertical" align="center">
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          block
          disabled={optionAns.length <= 0}
          style={{ alignSelf: 'center' }}
          onClick={handleAddOption}
        >
          Add Option
        </Button>
      </Space>
      <Radio.Group value={correct} onChange={handleChangeCorrectOption} style={{ width: '100%' }}>
        <Space direction="vertical">
          {value &&
            value.map((option, index) => {
              const { ans, value } = option;
              return (
                <Space key={index} align="center" style={{ justifyContent: 'space-between' }}>
                  <Radio value={value} style={{ alignItems: 'center' }}>
                    {ans}
                  </Radio>
                  <Popconfirm
                    title="Are you sure to remove this option?"
                    placement="topRight"
                    onConfirm={() => handleRemoveOption(value)}
                    okText="Remove"
                    cancelText="Cancel"
                  >
                    <DeleteOutlined />
                  </Popconfirm>
                </Space>
              );
            })}
        </Space>
      </Radio.Group>
    </Space>
  );
};

export default SingleOptions;
