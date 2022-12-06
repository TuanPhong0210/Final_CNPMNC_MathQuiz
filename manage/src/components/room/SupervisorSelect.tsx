import { Select } from 'antd';

// models
import { Room, GeneralAccount } from '../../models';

const { Option } = Select;

interface SupervisorSelectProps {
  teachers: GeneralAccount[];
  value?: Room['supervisor'];
  onChange?: (value: SupervisorSelectProps['value']) => void;
}

const SupervisorSelect = ({ teachers, value, onChange }: SupervisorSelectProps) => {
  const handleSelectedSupervisor = (supervisor: Room['supervisor']) => {
    onChange?.(supervisor);
  };
  return (
    <Select
      value={value}
      mode="multiple"
      showSearch
      allowClear
      placeholder="Select supervisor"
      onChange={handleSelectedSupervisor}
    >
      {teachers.map((teacher) => {
        const { _id, name } = teacher;
        return (
          <Option key={_id} value={_id}>
            {name}
          </Option>
        );
      })}
    </Select>
  );
};

export default SupervisorSelect;
