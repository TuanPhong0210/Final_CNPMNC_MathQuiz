import { useNavigate } from 'react-router-dom';
import { Button, Divider, Paper, Stack, styled } from '@mui/material';

// routes
import { PATH_MAIN } from '../../routes/path';
//
import CountDown from '../CountDown';
import Information from '../Information';

const SidebarRight = ({ questions, selected, countdown, examTime }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    let correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
      const { _id, value } = questions[i];
      const selectedValue = selected[_id];
      if (!selectedValue) {
        continue;
      }

      if (selectedValue.replaceAll('-', '') === value.replaceAll('-', '')) {
        correctCount++;
      }
    }
    localStorage.removeItem('selected');

    const result = {
      totalTime: examTime,
      timeLeft: countdown,
      correct: correctCount,
      total: questions.length,
    };
    navigate(PATH_MAIN.score, {
      replace: true,
      state: result,
    });
  };
  return (
    <RootStyle>
      <Stack spacing={2}>
        <Item>
          <DividerStyle>Math Test</DividerStyle>
        </Item>
        <Item>
          <CountDown countdown={{ time: countdown, type: 'finish' }} />
        </Item>
        <Item>Time to do multiple choice test</Item>
        <Item>
          <Information state={{ totalTime: examTime, total: questions.length }} />
        </Item>
        <Item>
          <ButtonSubmit onClick={handleSubmit}>Submit</ButtonSubmit>
        </Item>
      </Stack>
    </RootStyle>
  );
};

const RootStyle = styled('div')({
  backgroundColor: '#461a42',
  width: '360px',
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
  color: '#fff',
  '&:hover': {
    boxShadow: 'inset 0 0 0 rgb(0 0 0 / 10%), 4px 4px 0 2px rgb(0 0 0 / 10%)',
    backgroundColor: '#703BA9',
  },
});

export default SidebarRight;
