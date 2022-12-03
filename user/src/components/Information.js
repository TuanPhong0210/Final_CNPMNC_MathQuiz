import { Grid, styled } from '@mui/material';

// components
import BoxStyled from './BoxStyled';
// hooks
import useAuth from '../hooks/useAuth';
// utils
import { fTime } from '../utils/formatTime';

const Information = ({ state }) => {
  const { totalTime, timeLeft, total } = state;
  const { profile } = useAuth();
  return (
    <BoxStyled>
      <GridContainStyle container spacing={1}>
        <Grid item xs={5}>
          Fullname:
        </Grid>
        <Grid item xs={7}>
          {profile.name}
        </Grid>
        <Grid item xs={5}>
          MSSV:
        </Grid>
        <Grid item xs={7}>
          {profile.account_code}
        </Grid>
        <Grid item xs={5}>
          Class:
        </Grid>
        <Grid item xs={7}>
          K45.CNTTA
        </Grid>
        <Grid item xs={5}>
          Teacher:
        </Grid>
        <Grid item xs={7}>
          Tran Son Hai
        </Grid>
        <Grid item xs={5}>
          Questions:
        </Grid>
        <Grid item xs={7}>
          {total} sentences
        </Grid>
        {totalTime && (
          <>
            <Grid item xs={5}>
              Exam time:
            </Grid>
            <Grid item xs={7}>
              {fTime(totalTime)}
            </Grid>
          </>
        )}
        {timeLeft && (
          <>
            <Grid item xs={5}>
              Time spend:
            </Grid>
            <Grid item xs={7}>
              {fTime(totalTime - timeLeft)}
            </Grid>
          </>
        )}
      </GridContainStyle>
    </BoxStyled>
  );
};

const GridContainStyle = styled(Grid)({
  justifyContent: 'start',
  textAlign: 'start',
});

export default Information;
