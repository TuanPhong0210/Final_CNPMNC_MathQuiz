import { Button, Divider, Paper, Stack, styled } from '@mui/material';
import CountDown from '../CountDown';
import Information from '../Information';

const countdown = 5400;

const SidebarRight = () => {
  return (
    <RootStyle>
      <Stack spacing={2}>
        <Item>
          <DividerStyle>Math Test</DividerStyle>
        </Item>
        <Item>
          <CountDown countdown={countdown} />
        </Item>
        <Item>Time to do multiple choice test</Item>
        <Item>
          <Information />
        </Item>
        <Item>
          <ButtonSubmit>Submit</ButtonSubmit>
        </Item>
      </Stack>
    </RootStyle>
  );
};

const RootStyle = styled('div')({
  backgroundColor: '#461a42',
  width: '360px',
  height: '500px',
  borderRadius: '16px 0 0 16px',
  padding: '20px',
  textAlign: 'center',
});

const Item = styled(Paper)({
  color: '#fff',
  backgroundColor: 'rgba(0,0,0,0)',
  boxShadow: 'none',
});

const DividerStyle = styled(Divider)({
  fontSize: '22px',
  fontWeight: 'bold',
  '@:before :after': {
    borderColor: '#fff',
  },
});

const ButtonSubmit = styled(Button)({
  backgroundColor: '#8854c0',
  borderRadius: '8px',
  boxShadow: '0px 4px 0px #6c4298',
  transition: '0.1s all ease-in-out',
  '&:hover': {
    boxShadow: 'inset 0 0 0 rgb(0 0 0 / 10%), 4px 4px 0 2px rgb(0 0 0 / 10%)',
    backgroundColor: '#703BA9',
  },
});

export default SidebarRight;
