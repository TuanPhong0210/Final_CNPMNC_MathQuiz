import { useEffect } from 'react';
import moment from 'moment';
import { Form, Space, Input, Spin, Button, Alert, message, DatePicker, TimePicker } from 'antd';
import { NodeExpandOutlined } from '@ant-design/icons';

// hooks
import useDrawer from '../../hooks/useDrawer';
// models
import type { Room } from '../../models';
// redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectAccount } from '../../redux/slices/account';
import { clearAction, selectRoom } from '../../redux/slices/room';
import { CreateRoomPayload, updateRoomAction } from '../../redux/actions/room';
import { createRoomAction } from '../../redux/actions/room';
//
import SupervisorSelect from './SupervisorSelect';

interface RoomFormProps {
  room?: Room;
}

const getTime = (time: string | undefined, format = 'YYYY-MM-DD HH:mm:ss') => {
  return time ? moment(time, format) : moment();
};

const RoomForm = ({ room }: RoomFormProps) => {
  const sliceDispatch = useAppDispatch();
  const { teachers } = useAppSelector(selectAccount);
  const { isLoading, error, lastAction } = useAppSelector(selectRoom);
  const { closeDrawer } = useDrawer();
  const [form] = Form.useForm();
  const { resetFields } = form;
  useEffect(() => {
    if (lastAction !== undefined) {
      switch (lastAction) {
        case 'create':
          resetFields();
          break;
        case 'update':
          closeDrawer();
          break;
        default:
          break;
      }
      sliceDispatch(clearAction());
    }
    // eslint-disable-next-line
  }, [lastAction]);

  const onFinish = (values: CreateRoomPayload) => {
    if (!room) {
      // create goes here
      message.loading({ content: 'Processing...', key: 'create' });
      sliceDispatch(
        createRoomAction({
          ...values,
          start_time: (values['start_time'] as any).format('YYYY-MM-DD HH:mm:ss'),
          exam_time: (values['exam_time'] as any).format('HH:mm:ss'),
        })
      );
      return;
    }
    // update goes here
    message.loading({ content: 'Processing...', key: 'update' });
    sliceDispatch(
      updateRoomAction({
        _id: room._id,
        ...values,
        start_time: (values['start_time'] as any).format('YYYY-MM-DD HH:mm:ss'),
        exam_time: (values['exam_time'] as any).format('HH:mm:ss'),
      })
    );
  };
  return (
    <Spin spinning={isLoading}>
      <Form
        form={form}
        initialValues={{
          title: room?.title || '',
          description: room?.description || '',
          start_time: getTime(room?.start_time) || '',
          exam_time: getTime(room?.exam_time, 'HH:mm:ss') || '',
          supervisor: room?.supervisor || [],
        }}
        onFinish={onFinish}
      >
        <Space direction="vertical">
          <Form.Item
            name="title"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Room title is required!',
              },
            ]}
          >
            <Input
              name="title"
              autoComplete="none"
              allowClear
              prefix={<NodeExpandOutlined />}
              placeholder="Room title"
            />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea
              showCount
              allowClear
              maxLength={250}
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="Describe your room here..."
            />
          </Form.Item>
          <Space>
            <Form.Item
              name="start_time"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Start time is required!',
                },
              ]}
            >
              <DatePicker showTime placeholder="Select start time" />
            </Form.Item>
            <Form.Item
              name="exam_time"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Exam time is required!',
                },
              ]}
            >
              <TimePicker placeholder="Exam time" />
            </Form.Item>
          </Space>
          <Form.Item
            name="supervisor"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Supervisor is required!',
              },
            ]}
          >
            <SupervisorSelect teachers={teachers} />
          </Form.Item>
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              style={{ marginBottom: '10px' }}
              onClose={() => sliceDispatch(clearAction())}
            />
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              {room ? 'Save' : 'Create'}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Spin>
  );
};

export default RoomForm;
