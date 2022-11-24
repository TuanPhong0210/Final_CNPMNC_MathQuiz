import { useState, Key } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Space, Typography, Table, Tag, Modal } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

// guard
import type { ActionsPassedGuardProps } from '../../guards/AccessGuard';
// models
import { Question } from '../../models';

const { Text } = Typography;

const columns: ColumnsType<Question> = [
  {
    title: 'Content',
    dataIndex: 'content',
    render: (text) => <Text>{text}</Text>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    render: (text) => <Text strong>{text}</Text>,
  },
];

const QuestionList = ({ actionsAllowed }: ActionsPassedGuardProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const actionsAccessible: ColumnsType<Question> = [
    {
      title: 'Actions',
      dataIndex: '',
      render: () => {
        return (
          <Space size="middle" align="center">
            {actionsAllowed.includes('update') && (
              <Tag
                icon={<EditOutlined />}
                color="success"
                onClick={() => {}}
                style={{ cursor: 'pointer' }}
              >
                Update
              </Tag>
            )}
            {actionsAllowed.includes('delete') && (
              <Tag
                icon={<DeleteOutlined />}
                color="error"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  Modal.confirm({
                    centered: true,
                    title: `Are you sure you want to delete this question?`,
                    content: 'After deletion, the question will be saved to the recycle bin',
                    okButtonProps: {
                      danger: true,
                    },
                    okText: 'Delete',
                    onOk() {},
                  });
                }}
              >
                Delete
              </Tag>
            )}
          </Space>
        );
      },
    },
  ];

  const handleChangeSelectedRow = (newSelectedRowKeys: Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space size="middle">
        {actionsAllowed.includes('create') && (
          <Button type="primary" shape="round" icon={<QuestionCircleOutlined />}>
            Create question
          </Button>
        )}
        <Button type="dashed" shape="round" icon={<DeleteOutlined />} danger>
          Recycle bin
        </Button>
        {selectedRowKeys.length > 0 && (
          <Button type="primary" shape="round" danger icon={<DeleteOutlined />}>
            Delete selected questions
          </Button>
        )}
      </Space>
      <Table
        rowKey="_id"
        rowSelection={{
          selectedRowKeys,
          onChange: handleChangeSelectedRow,
        }}
        columns={actionsAllowed.length > 0 ? [...columns, ...actionsAccessible] : columns}
        dataSource={[]}
      />
    </Space>
  );
};

export default QuestionList;
