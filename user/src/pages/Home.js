import { Container, Grid, Stack, styled, Typography } from '@mui/material';
import CountDown from '../components/CountDown';
import BoxStyled from '../components/BoxStyled';

const countdown = 90;
const room = true;

const Home = () => {
  return (
    <>
      {room && (
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
                  Question: <span style={{ color: 'red' }}>50</span>, Time:{' '}
                  <span style={{ color: 'red' }}>90 minute</span>, Supervisor:{' '}
                  <span style={{ color: 'red' }}>Tran Son Hai</span>
                </Typography>
              </BoxStyled>
            </Grid>
            <Grid item xs={9}>
              <BoxStyled>
                <Typography variant="p">Fullname: Nguyen Tuan Phong</Typography>
                <br />
                <Typography variant="p">MSSV: 4501104174</Typography>
              </BoxStyled>
            </Grid>
            <Grid item xs={3}>
              <BoxStyled>
                <Typography variant="p">
                  <CountDown countdown={countdown} />
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
      )}
      {!room && (
        <Container
          sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            There are currently no exam rooms available
            <br />
            Please come back later
          </Typography>
        </Container>
      )}
    </>
  );
};

const RootStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  width: '100vw',
});

export default Home;
