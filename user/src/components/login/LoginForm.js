import { Link, Stack, styled, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormikProvider, Form, useFormik } from 'formik';

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
    });
    return (
        <FormikProvider value={formik}>
            <FormStyle>
                <Stack spacing={2} sx={{ width: '80%', display: 'flex', margin: 'auto' }}>
                    <Stack display='flex' alignItems='center' justifyContent='center'>
                        <Typography variant='p' sx={{ fontWeight: 'bold' }}>
                            Để làm quiz này
                        </Typography>
                        <Typography variant='p' alignItems='center'>
                            1. Sử dụng bất kỳ thiết bị nào để mở
                        </Typography>
                        <Typography variant='p' alignItems='center'>
                            2. Nhập Mã tham gia
                        </Typography>
                    </Stack>
                    <TextFieldStyle
                        fullWidth
                        label='MSSV'
                    />
                    <TextFieldStyle
                        fullWidth
                        label='Password'
                        type='password'
                    />
                    <Stack direction='row' alignItems='center' justifyContent='end'>
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
                    <LoadingButtonStyle
                        type='submit'
                        variant='contained'
                    >
                        Login
                    </LoadingButtonStyle>
                </Stack>
            </FormStyle>
        </FormikProvider>
    )
};

const FormStyle = styled(Form)({
    width: '500px',
    margin: 'auto',
    background: 'linear-gradient(to bottom, #434343 0%, #000 100%)',
    color: '#fff',
    padding: '12px',
    borderRadius: '16px',
})

const TextFieldStyle = styled(TextField)({
    backgroundColor: '#fff',
    color: '#242a3e',
    borderRadius: '8px',
    boxShadow: '2px 2px 0 4px rgb(0 0 0 / 10%)',
    boxSizing: 'border-box',
})

const LoadingButtonStyle = styled(LoadingButton)({
    background: 'rgba(136,84,192,0.2)',
    border: '1px solid rgba(255,255,255,0.66)',
    borderRadius: '8px',
    '&:hover': {
        background: 'rgba(136,84,192,0.4)',
    },
})


export default LoginForm;