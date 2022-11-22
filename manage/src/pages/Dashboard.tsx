import type { ColumnsType } from 'antd/es/table';
import { Button, Space, Table } from 'antd';
import { FolderAddOutlined, DeleteOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

const Dashboard = () => {
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space size="middle">
        <Button type="primary" shape="round" icon={<FolderAddOutlined />}>
          Create account
        </Button>
        <Button type="dashed" shape="round" icon={<DeleteOutlined />} danger>
          Recycle bin
        </Button>
      </Space>
      <Table rowKey="_id" loading={false} columns={columns} dataSource={data} />
    </Space>
  );
};

export default Dashboard;
