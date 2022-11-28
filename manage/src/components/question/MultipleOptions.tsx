import { ChangeEvent, useState } from 'react';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Checkbox } from 'antd';
import { Button, Input, Popconfirm, Space, Typography } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

// models
import { MultipleOption } from '../../models';

const { Text } = Typography;

interface MultipleOptionsProps {
  correct: MultipleOption['value'];
  onChangeCorrect: (correct: MultipleOption['value']) => void;
  value?: MultipleOption[];
  onChange?: (value: MultipleOptionsProps['value']) => void;
}

const MultipleOptions = ({ correct, onChangeCorrect, value, onChange }: MultipleOptionsProps) => {
  const [optionAns, setOptionAns] = useState<MultipleOption['ans']>('');
  const options = value?.map((option) => {
    const { ans, value } = option;
    const displayAns = (
      <Space align="center" style={{ justifyContent: 'space-between' }}>
        <Text>{ans}</Text>
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
    return {
      label: displayAns,
      value,
    };
  });

  const handleChangeOptionAns = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOptionAns(e.target.value);
  };
  const handleChangeCorrectOption = (checkedValues: CheckboxValueType[]) => {
    const correct = checkedValues.join('-');
    onChangeCorrect(correct);
  };
  const handleAddOption = () => {
    const newOption: MultipleOption = {
      ans: optionAns,
      value: Date.now().toString(),
    };
    onChange?.([...value!, newOption]);
    setOptionAns('');
  };
  const handleRemoveOption = (optionValue: MultipleOption['value']) => {
    if (correct.split('-').includes(optionValue)) {
      const newCorrect = correct
        .split('-')
        .filter((e) => e !== optionValue)
        .join('-');
      onChangeCorrect(newCorrect);
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
      <Checkbox.Group
        className="vertical-checkbox-group"
        value={correct.split('-')}
        options={options}
        onChange={handleChangeCorrectOption}
      />
    </Space>
  );
};

export default MultipleOptions;
