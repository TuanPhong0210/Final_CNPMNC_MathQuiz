import { useLocation } from 'react-router-dom';
import { Box, Container, styled, Typography } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';

// components
import BoxStyled from '../components/BoxStyled';
import Information from '../components/Information';

const Score = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      // <RootStyleUnExam>
      //   <Typography variant="h4">The test was canceled due to not taking it</Typography>
      //   <Typography variant="h5">Wish you luck next time</Typography>
      // </RootStyleUnExam>
      <Container
        sx={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div>
          <Typography variant="h3" fontWeight="bold" marginBottom="20px">
            The test <br /> was canceled due <br /> to not taking it
          </Typography>
          <Typography variant="h5" fontWeight="bold" paddingLeft="20px" borderLeft="2px solid #fff">
            Wish you luck next time
          </Typography>
        </div>
        <img width="45%" src="/images/Group118.png" alt="Wish you luck next time" />
      </Container>
    );
  }

  return (
    <RootStyle>
      <Typography variant="p">Score</Typography>
      <Box p="16px 0 16px">
        <Box m="0 auto" maxWidth="480px" position="relative">
          <BoxStyled style={{ display: 'flex' }}>
            <ImageStyleBox>
              <ImageStyle src="/images/monster17.png" alt="avatar" />
            </ImageStyleBox>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <NameStyle>Phong Nguyen</NameStyle>
              <LiveStyle>
                <GroupsIconStyle />
                <LiveTitleStyle>Live</LiveTitleStyle>
              </LiveStyle>
            </Box>
            <Box paddingTop="4px">
              <Typography variant="p" lineHeight="34px" fontSize="20px">
                Score
                <br />
                {state.correct}/{state.total}
              </Typography>
            </Box>
          </BoxStyled>
          {state && <Information state={state} />}
        </Box>
      </Box>
    </RootStyle>
  );
};

const RootStyle = styled('div')({
  backgroundColor: 'rgba(0,0,0,.7)',
  maxWidth: '528px',
  margin: '0 auto',
  position: 'relative',
  padding: '24px 8px 0 8px',
  textAlign: 'center',
});

const ImageStyleBox = styled('div')({
  width: '72px',
  height: '72px',
  marginRight: '16px',
});

const ImageStyle = styled('img')({
  width: '100%',
  height: '100%',
});

const NameStyle = styled(Typography)({
  width: '280px',
  fontSize: '20px',
  paddingTop: '4px',
  marginBottom: '12px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'initial',
});

const LiveStyle = styled('div')({
  width: '75px',
  display: 'inline-flex',
  padding: '6px 16px',
  background: 'hsla(0,0%,100%,.1)',
  borderRadius: '10px',
});

const GroupsIconStyle = styled(GroupsIcon)({
  fontWeight: '900',
  fontSize: '15px',
  lineHeight: '10px',
  textAlign: 'center',
  marginRight: '8px',
});

const LiveTitleStyle = styled(Typography)({
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '15px',
});

export default Score;
