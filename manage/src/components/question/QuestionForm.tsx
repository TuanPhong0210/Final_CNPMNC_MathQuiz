import { useEffect } from 'react';
import { Alert, Button, Divider, Form, Input, message, Space, Spin } from 'antd';

// hooks
import useDrawer from '../../hooks/useDrawer';
// models
import { Question } from '../../models';
// redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectQuestion, clearAction } from '../../redux/slices/question';
import { CreateQuestionPayload, updateQuestionAction } from '../../redux/actions/question';
import { createQuestionAction } from '../../redux/actions/question';
//
import QuestionTypeSelect from './QuestionTypeSelect';
import SingleOptions from './SingleOptions';
import MultipleOptions from './MultipleOptions';
import TextOption from './TextOption';

interface QuestionFormProps {
  question?: Question;
}

const QuestionForm = ({ question }: QuestionFormProps) => {
  const sliceDispatch = useAppDispatch();
  const { isLoading, error, lastAction } = useAppSelector(selectQuestion);
  const { closeDrawer } = useDrawer();
  const [form] = Form.useForm();
  const { resetFields } = form;
  const type: Question['type'] = Form.useWatch('type', form);
  const value: Question['value'] = Form.useWatch('value', form);
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

  const handleChangeCorrect = (correct: Question['value']) => {
    form.setFieldValue('value', correct);
  };
  const onFinish = (values: CreateQuestionPayload) => {
    if (!value) {
      message.error('Missing correct answer!');
      return;
    }

    if (!question) {
      // create goes here
      message.loading({ content: 'Processing...', key: 'create' });
      sliceDispatch(
        createQuestionAction({
          ...values,
          value,
        })
      );
      return;
    }
    // update goes here
    message.loading({ content: 'Processing...', key: 'update' });
    sliceDispatch(
      updateQuestionAction({
        _id: question._id,
        ...values,
        value,
      })
    );
  };
  return (
    <Spin spinning={isLoading}>
      <Form
        form={form}
        initialValues={{
          content: question?.content || '',
          type: question?.type || 'SINGLE',
          options: question?.options || [],
          value: question?.value || '',
        }}
        onFinish={onFinish}
      >
        <Space direction="vertical">
          <Form.Item
            name="content"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'This field is required!',
              },
            ]}
          >
            <Input.TextArea
              showCount
              allowClear
              maxLength={250}
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="Describe your question here..."
            />
          </Form.Item>
          <Form.Item
            name="type"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'This field is required!',
              },
            ]}
            help="Select type for this question"
          >
            <QuestionTypeSelect />
          </Form.Item>
          <Divider plain>Options</Divider>
          <Form.Item
            name="options"
            rules={[
              {
                required: true,
                message: 'Options is required!',
              },
            ]}
          >
            {type === 'SINGLE' ? (
              <SingleOptions correct={value} onChangeCorrect={handleChangeCorrect} />
            ) : type === 'MULTIPLE' ? (
              <MultipleOptions correct={value} onChangeCorrect={handleChangeCorrect} />
            ) : type === 'TEXT' ? (
              <TextOption onChangeCorrect={handleChangeCorrect} />
            ) : (
              <Alert message="Question type not found" type="error" showIcon />
            )}
          </Form.Item>
          <Form.Item name="value" noStyle>
            <div></div>
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
              {question ? 'Save' : 'Create'}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Spin>
  );
};

export default QuestionForm;
