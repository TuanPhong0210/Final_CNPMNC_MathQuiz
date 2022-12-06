import { useState, Key } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { Button, Space, Typography, Table, Tag, Modal } from 'antd';
import { FormOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

// guard
import type { ActionsPassedGuardProps } from '../../guards/AccessGuard';
// hooks
import useDrawer from '../../hooks/useDrawer';
// models
import { Room } from '../../models';
// redux
import { useAppSelector } from '../../redux/hooks';
import { selectRoom } from '../../redux/slices/room';

const { Text } = Typography;

const columns: ColumnsType<Room> = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: (text) => <Text>{text}</Text>,
  },
  {
    title: 'Start time',
    dataIndex: 'start_time',
    render: (text) => <Text strong>{new Date(text).toUTCString()}</Text>,
  },
  {
    title: 'Exam in',
    dataIndex: 'exam_time',
    render: (text) => <Text strong>{text}</Text>,
  },
];

const RoomList = ({ actionsAllowed }: ActionsPassedGuardProps) => {
  const { openDrawer } = useDrawer();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const { isLoading, rooms } = useAppSelector(selectRoom);
  const actionsAccessible: ColumnsType<Room> = [
    {
      title: 'Actions',
      dataIndex: '',
      render: (_, record) => {
        const { _id } = record;
        return (
          <Space size="middle" align="center">
            {actionsAllowed.includes('update') && (
              <Tag
                icon={<EditOutlined />}
                color="success"
                onClick={() =>
                  openDrawer({
                    key: 'roomForm',
                    title: `Update room`,
                    props: { room: rooms.find((room) => room._id === _id) },
                  })
                }
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
                    title: `Are you sure you want to delete this room?`,
                    content: 'After deletion, the room will be saved to the recycle bin',
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
          <Button
            type="primary"
            shape="round"
            icon={<FormOutlined />}
            onClick={() =>
              openDrawer({
                key: 'roomForm',
                title: 'Create room',
              })
            }
          >
            Create room
          </Button>
        )}
        <Button type="dashed" shape="round" icon={<DeleteOutlined />} danger>
          Recycle bin
        </Button>
        {selectedRowKeys.length > 0 && (
          <Button type="primary" shape="round" danger icon={<DeleteOutlined />}>
            Delete selected rooms
          </Button>
        )}
      </Space>
      <Table
        rowKey="_id"
        loading={isLoading}
        rowSelection={{
          selectedRowKeys,
          onChange: handleChangeSelectedRow,
        }}
        columns={actionsAllowed.length > 0 ? [...columns, ...actionsAccessible] : columns}
        dataSource={rooms}
      />
    </Space>
  );
};

export default RoomList;
