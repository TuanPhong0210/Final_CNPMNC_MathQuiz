import { Grid, styled } from '@mui/material';
import BoxStyled from './BoxStyled';

const Information = () => {
  return (
    <BoxStyled>
      <GridContainStyle container spacing={1}>
        <Grid item xs={5}>
          Fullname:
        </Grid>
        <Grid item xs={7}>
          Nguyen Tuan Phong
        </Grid>
        <Grid item xs={5}>
          MSSV:
        </Grid>
        <Grid item xs={7}>
          4501104174
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
          50 sentences
        </Grid>
        <Grid item xs={5}>
          Time:
        </Grid>
        <Grid item xs={7}>
          90 minutes
        </Grid>
      </GridContainStyle>
    </BoxStyled>
  );
};

const GridContainStyle = styled(Grid)({
  justifyContent: 'start',
  textAlign: 'start',
});

export default Information;
