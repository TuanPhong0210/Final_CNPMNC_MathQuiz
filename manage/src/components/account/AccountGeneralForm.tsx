import { useEffect } from 'react';
import styled from 'styled-components';
import { Space, Typography, Input, Button, message, Select } from 'antd';
import { useFormik, FormikProvider, Form } from 'formik';

// guard
import type { ActionsPassedGuardProps } from '../../guards/AccessGuard';
// models
import type { Account, Administrator, Teacher, Student, GeneralAccount, Role } from '../../models';
// redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { CreateAccountPayload, UpdateAccountPayload } from '../../redux/actions/account';
import { createAccountAction, updateAccountAction } from '../../redux/actions/account';
import { clearAction, selectAccount } from '../../redux/slices/account';
import { selectAccessControl } from '../../redux/slices/accessControl';
// utils
import { createAccountValidation, updateAccountValidation } from '../../utils/validation';

const { Option } = Select;
const { Text } = Typography;

export interface AccountGeneralFormProps extends Pick<ActionsPassedGuardProps, 'actionsAllowed'> {
  account?: GeneralAccount;
  account_type: Account['type'];
}

const AccountGeneralForm = ({ account, account_type, actionsAllowed }: AccountGeneralFormProps) => {
  const { lastAction } = useAppSelector(selectAccount);
  const { roles } = useAppSelector(selectAccessControl);
  const dispatch = useAppDispatch();
  const administrator: Administrator = {};
  const teacher: Teacher = {};
  const student: Student = {};
  let dependentValues =
    account_type === 'Administrator'
      ? administrator
      : account_type === 'Teacher'
      ? teacher
      : student;
  const initialValues: CreateAccountPayload | UpdateAccountPayload = {
    account_code: account?.account_code || '',
    name: account?.name || '',
    password: '',
    passwordConfirm: '',
    roles: account?.roles || [],
    account_type,
    ...dependentValues,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: account ? updateAccountValidation : createAccountValidation,
    validateOnChange: false,
    onSubmit: async (values) => {
      if (!account) {
        // create goes here
        message.loading({ content: 'Processing...', key: 'create' });
        dispatch(createAccountAction(values));
        return;
      }
      // update goes here
      message.loading({ content: 'Processing...', key: 'update' });
      dispatch(
        updateAccountAction({
          _id: account._id,
          ...values,
        })
      );
    },
  });
  const { values, touched, errors, isSubmitting, getFieldProps, setFieldValue, resetForm } = formik;
  useEffect(() => {
    if (lastAction !== undefined) {
      switch (lastAction) {
        case 'create':
          resetForm();
          break;
        default:
          break;
      }
      dispatch(clearAction());
    }
    // eslint-disable-next-line
  }, [lastAction]);

  const handleChangeRoles = (value: Role['name'][]) => {
    setFieldValue('roles', value);
  };
  // const handleChangeGender = (e: RadioChangeEvent) => {
  //   const value = e.target.value;
  //   setFieldValue('gender', value);
  // };
  return (
    <FormikProvider value={formik}>
      <Form>
        <Space direction="vertical" size="middle" style={{ padding: '20px' }}>
          <Stack size="middle" align="baseline">
            <Space direction="vertical" size="small">
              <Text strong>Account code:</Text>
              <Input
                size="large"
                placeholder="Enter account code..."
                {...getFieldProps('account_code')}
                status={Boolean(touched.account_code && errors.account_code) ? 'error' : ''}
              />
              {touched.account_code && (
                <Text strong type="danger">
                  {errors.account_code}
                </Text>
              )}
            </Space>
          </Stack>
          <Space direction="vertical" size="small">
            <Text strong>Name:</Text>
            <Input
              size="large"
              placeholder="Enter your name..."
              {...getFieldProps('name')}
              status={Boolean(touched.name && errors.name) ? 'error' : ''}
            />
            {touched.name && (
              <Text strong type="danger">
                {errors.name}
              </Text>
            )}
          </Space>
          {!account && (
            <>
              <Space direction="vertical" size="small">
                <Text strong>Password:</Text>
                <Input.Password
                  size="large"
                  placeholder="Enter your password..."
                  {...getFieldProps('password')}
                  status={Boolean(touched.password && errors.password) ? 'error' : ''}
                />
                {touched.password && (
                  <Text strong type="danger">
                    {errors.password}
                  </Text>
                )}
              </Space>
              <Space direction="vertical" size="small">
                <Text strong>Password confirm:</Text>
                <Input.Password
                  size="large"
                  placeholder="Confirm your password..."
                  {...getFieldProps('passwordConfirm')}
                  status={Boolean(touched.passwordConfirm && errors.passwordConfirm) ? 'error' : ''}
                />
                {touched.passwordConfirm && (
                  <Text strong type="danger">
                    {errors.passwordConfirm}
                  </Text>
                )}
              </Space>
            </>
          )}
          {actionsAllowed.includes('authorize') && (
            <Space direction="vertical" size="small">
              <Text strong>Roles:</Text>
              <Select
                value={values.roles}
                mode="multiple"
                allowClear
                showSearch
                placeholder="Specify the role of the account"
                style={{ width: '100%' }}
                onChange={handleChangeRoles}
              >
                {roles.map((role) => {
                  const { _id, name } = role;
                  return (
                    <Option key={_id} value={name}>
                      {name}
                    </Option>
                  );
                })}
              </Select>
            </Space>
          )}
          {/* {account_type === 'Customer' && (
            <>
              <Space direction="vertical" size="small">
                <Text strong>Gender:</Text>
                <Radio.Group value={values.gender} onChange={handleChangeGender}>
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>
              </Space>
            </>
          )} */}
          <Button htmlType="submit" type="primary" block loading={isSubmitting}>
            {account ? 'Save changes' : 'Create'}
          </Button>
        </Space>
      </Form>
    </FormikProvider>
  );
};

const Stack = styled(Space)({
  '& > .ant-space-item': {
    width: '100%',
  },
});

export default AccountGeneralForm;
