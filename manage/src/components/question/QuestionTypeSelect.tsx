import { Select } from 'antd';

// models
import { QuestionType } from '../../models';

interface TypeSelect {
  value: QuestionType;
  label: string;
}

const types: TypeSelect[] = [
  {
    value: 'SINGLE',
    label: 'Single',
  },
  {
    value: 'MULTIPLE',
    label: 'Multiple',
  },
  {
    value: 'TEXT',
    label: 'Text',
  },
];

interface QuestionTypeSelectProps {
  value?: QuestionType;
  onChange?: (value: QuestionTypeSelectProps['value']) => void;
}

const QuestionTypeSelect = ({ value, onChange }: QuestionTypeSelectProps) => {
  const handleChangeQuestionType = (value: QuestionType) => {
    onChange?.(value);
  };
  return (
    <Select
      value={value}
      allowClear
      showSearch
      placeholder="Select question type"
      options={types}
      onChange={handleChangeQuestionType}
    />
  );
};

export default QuestionTypeSelect;
