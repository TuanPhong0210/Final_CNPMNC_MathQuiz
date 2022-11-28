import { ChangeEvent, useState } from 'react';
import { Input } from 'antd';

// models
import { TextOption } from '../../models';

interface TextOptionProps {
  onChangeCorrect: (correct: TextOption) => void;
  value?: TextOption[];
  onChange?: (value: TextOptionProps['value']) => void;
}

const TextQuestions = ({ onChangeCorrect, value, onChange }: TextOptionProps) => {
  const [option, setOption] = useState(value ? value[0] : '');

  const handleChangeOptionValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setOption(e.target.value);
  };
  const handleChangeCorrectOption = () => {
    onChange?.([option]);
    onChangeCorrect(option);
  };
  return (
    <Input.TextArea
      value={option}
      showCount
      allowClear
      maxLength={200}
      autoSize={{ minRows: 2, maxRows: 4 }}
      placeholder="Describe your answer here..."
      onChange={handleChangeOptionValue}
      onBlur={handleChangeCorrectOption}
    />
  );
};

export default TextQuestions;
