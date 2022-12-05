import { useEffect, useState } from 'react';
import { Container, Grid, Stack, styled, Typography } from '@mui/material';
import CountDown from '../components/CountDown';
import BoxStyled from '../components/BoxStyled';

// apis
import questionAPI from '../apis/questionAPI';
// components
import { ExamRoom } from '../components/examroom';
import Loading from '../components/Loading';
// hooks
import useAuth from '../hooks/useAuth';
// utils
import { fTime, getDiffTimeToNowInSeconds, timeToSeconds } from '../utils/formatTime';

const startTime = '2022-12-05 22:30:00';
const examTime = '00:60:00';

const Home = () => {
  const { profile } = useAuth();
  const [questions, setQuestions] = useState([]);
  const cdTimeToStart = getDiffTimeToNowInSeconds(startTime);
  const cdTimeToFinish = cdTimeToStart + timeToSeconds(examTime);
  const hasRoom = cdTimeToFinish >= 0;
  const isExaming = cdTimeToStart < 0 && hasRoom;

  useEffect(() => {
    const fetchQuestionList = async () => {
      try {
        const response = await questionAPI.findAll();
        setQuestions(response.data);
      } catch (error) {
        console.log('Failed to fetch news list: ', error);
      }
    };

    fetchQuestionList();
  }, []);

  if (!questions) {
    return <Loading />;
  }

  if (!hasRoom) {
    return (
      <Container
        sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div>
          <Typography variant="h3" fontWeight="bold" marginBottom="20px">
            There are <br /> currently no exam <br /> rooms available
          </Typography>
          <Typography variant="h5" fontWeight="bold" paddingLeft="20px" borderLeft="2px solid #fff">
            Please come back later
          </Typography>
        </div>
        <img width="45%" src="/images/Group118.png" alt="Please come back later" />
      </Container>
    );
  }

  if (!isExaming) {
    return (
      <RootStyle>
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '620px',
          }}
        >
          <Grid item xs={12}>
            <BoxStyled>
              <Typography variant="h5" fontWeight="bold">
                Math Test Multiple-Choice
              </Typography>
              <Typography variant="p">
                Question: <span style={{ color: 'red' }}>{questions.length}</span>, Time:{' '}
                <span style={{ color: 'red' }}>{fTime(timeToSeconds(examTime))}</span>, Supervisor:{' '}
                <span style={{ color: 'red' }}>Tran Son Hai</span>
              </Typography>
            </BoxStyled>
          </Grid>
          <Grid item xs={6}>
            <BoxStyled>
              <Typography variant="p">Fullname: {profile.name}</Typography>
              <br />
              <Typography variant="p">MSSV: {profile.account_code}</Typography>
            </BoxStyled>
          </Grid>
          <Grid item xs={6}>
            <BoxStyled>
              <Typography variant="p">
                <CountDown countdown={{ time: cdTimeToStart, type: 'start' }} />
              </Typography>
            </BoxStyled>
          </Grid>
          <Grid item xs={12}>
            <BoxStyled>
              <Stack spacing={1} sx={{ textAlign: 'start' }}>
                <Typography
                  variant="p"
                  fontWeight="bold"
                  sx={{ textDecoration: 'underline', marginLeft: '10px' }}
                >
                  Noted:
                </Typography>
                <Stack>
                  <Typography> • Do not reload the web page.</Typography>
                  <Typography> • Do not enable new windows/tabs on the web.</Typography>
                  <Typography> • Do not use materials during the test.</Typography>
                </Stack>
              </Stack>
            </BoxStyled>
          </Grid>
        </Grid>
      </RootStyle>
    );
  }

  return (
    <ExamRoom questions={questions} countdown={cdTimeToFinish} examTime={timeToSeconds(examTime)} />
  );
};

const RootStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100vw',
});

export default Home;
