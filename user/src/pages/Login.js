import { styled } from '@mui/material';
import { LoginForm } from '../components/login';

const Login = () => {
  return (
    <RootStyle>
      <LoginForm />
    </RootStyle>
  );
};

const RootStyle = styled('div')({
  height: '80vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default Login;
