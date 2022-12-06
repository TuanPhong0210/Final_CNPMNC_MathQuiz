import { useNavigate } from 'react-router-dom';
import { Link, Stack, styled, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';

// hooks
import useAuth from '../../hooks/useAuth';
// routes
import { PATH_MAIN } from '../../routes/path';
// config
import { apiConfig } from '../../config';
// utils
// import enqueueSnackbar from '../../utils/snackbar';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      account_code: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const name = await login({
          ...values,
          service: apiConfig.service || '',
        });
        // enqueueSnackbar(`Welcome ${name} to exam math.`, {
        //   variant: 'success',
        //   anchorOrigin: {
        //     vertical: 'bottom',
        //     horizontal: 'center',
        //   },
        // });
        navigate(PATH_MAIN.home);
        console.log(name);
      } catch (error) {
        console.log(error);
        resetForm();
      }
    },
  });
  const { getFieldProps, isSubmitting, touched, errors } = formik;
  return (
    <FormikProvider value={formik}>
      <FormStyle>
        <Stack spacing={2} sx={{ width: '80%', display: 'flex', margin: 'auto' }}>
          <Stack display="flex" alignItems="center" justifyContent="center">
            <Typography variant="p" sx={{ fontWeight: 'bold' }}>
              Login with student account
            </Typography>
            <Typography variant="p" alignItems="center">
              Account provided by the instructor
            </Typography>
            <Typography variant="p" alignItems="center">
              Do not use for other purposes
            </Typography>
          </Stack>
          <TextFieldStyle
            fullWidth
            label="Account Code..."
            variant="filled"
            {...getFieldProps('account_code')}
            error={Boolean(touched.account_code && errors.account_code)}
            helperText={touched.account_code && errors.account_code}
          />
          <TextFieldStyle
            type="password"
            fullWidth
            label="Enter your password..."
            variant="filled"
            {...getFieldProps('password')}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <Stack direction="row" alignItems="center" justifyContent="end">
            <Link
              // variant='overline'
              sx={{
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.66)',
                cursor: 'pointer',
              }}
            >
              Forgot Password?
            </Link>
          </Stack>
          <LoadingButtonStyle type="submit" variant="contained" loading={isSubmitting}>
            Login
          </LoadingButtonStyle>
        </Stack>
      </FormStyle>
    </FormikProvider>
  );
};

const FormStyle = styled(Form)({
  width: '500px',
  margin: 'auto',
  background: 'linear-gradient(to bottom, #434343 0%, #000 100%)',
  color: '#fff',
  padding: '12px',
  borderRadius: '16px',
});

const TextFieldStyle = styled(TextField)({
  backgroundColor: '#fff',
  color: '#242a3e',
  borderRadius: '8px',
  boxShadow: '2px 2px 0 4px rgb(0 0 0 / 10%)',
  boxSizing: 'border-box',
});

const LoadingButtonStyle = styled(LoadingButton)({
  background: 'rgba(136,84,192,0.2)',
  border: '1px solid rgba(255,255,255,0.66)',
  borderRadius: '8px',
  '&:hover': {
    background: 'rgba(136,84,192,0.4)',
  },
});

export default LoginForm;
