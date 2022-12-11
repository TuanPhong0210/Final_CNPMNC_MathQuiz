import { useEffect, useState } from 'react';
import { Container, Grid, Stack, styled, Typography } from '@mui/material';
import CountDown from '../components/CountDown';
import BoxStyled from '../components/BoxStyled';

// apis
import roomAPI from '../apis/roomAPI';
// components
import { ExamRoom } from '../components/examroom';
import Loading from '../components/Loading';
// hooks
import useAuth from '../hooks/useAuth';
// utils
import { fTime, getDiffTimeToNowInSeconds, timeToSeconds } from '../utils/formatTime';
import { getResult } from '../utils/formatName';

const Home = () => {
  const { profile } = useAuth();
  const [room, setRoom] = useState(null);
  const date = room?.start_time && new Date(room.start_time);
  const cdTimeToStart = date && getDiffTimeToNowInSeconds(date.setHours(date.getHours() - 7));
  const cdTimeToFinish = date && cdTimeToStart + timeToSeconds(room.exam_time);
  const hasRoom = room && cdTimeToFinish >= 0;
  const isExaming = cdTimeToStart < 0 && hasRoom;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await roomAPI.findClosest();
        setRoom(response);
      } catch (error) {
        console.log('Failed to fetch news list: ', error);
      }
    };

    fetchRoom();
  }, []);

  if (!room) {
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
        <img width="50%" src="/images/Group118.png" alt="Please come back later" />
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
                Question: <span style={{ color: 'red' }}>{room.questions.length}</span>, &nbsp;
                Time: <span style={{ color: 'red' }}>{fTime(timeToSeconds(room.exam_time))}</span>,
                &nbsp; Supervisor:{' '}
                {room.supervisor.map((supervisor, index) => (
                  <span key={supervisor._id} style={{ color: 'red' }}>
                    {(index ? ', ' : '') + getResult(supervisor.name)}
                  </span>
                ))}
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
                  <Typography> • &emsp; Do not reload the web page.</Typography>
                  <Typography> • &emsp; Do not enable new windows/tabs on the web.</Typography>
                  <Typography> • &emsp; Do not use materials during the test.</Typography>
                </Stack>
              </Stack>
            </BoxStyled>
          </Grid>
        </Grid>
      </RootStyle>
    );
  }

  return (
    <ExamRoom
      questions={room.questions}
      countdown={cdTimeToFinish}
      examTime={timeToSeconds(room.exam_time)}
      supervisor={room.supervisor}
    />
  );
};

const RootStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100vw',
});

export default Home;
