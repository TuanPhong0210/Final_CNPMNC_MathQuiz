import { styled } from '@mui/material';

const Loading = () => {
  return (
    <RootStyle>
      <img src="/images/download.png" alt="Download" />
    </RootStyle>
  );
};

const RootStyle = styled('div')({
  '@keyframes spin-logo': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
  height: '85vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  animation: 'spin-logo infinite 1s linear',
});

export default Loading;
