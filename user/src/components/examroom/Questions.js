import { Grid, styled, Input, Typography, Button } from '@mui/material';
import { useState } from 'react';
import BoxStyled from '../BoxStyled';

const Questions = ({ question, index }) => {
  const answers = question.options;
  const [active, setActive] = useState(true);

  const Checked = () => {
    return active ? 'btn-active' : '';
  };
  console.log(active);
  console.log(Checked);

  const typequestion = (
    <Grid container spacing={2}>
      {question.type !== 'TEXT' ? (
        answers.map((answer, index) => {
          return (
            <Grid key={index} item xs={6}>
              <Answer className="btn-active">{answer.ans}</Answer>
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12}>
          <TextFieldStyle
            placeholder="Enter your results here"
            inputprops={{
              style: { color: '#fff' },
            }}
          />
        </Grid>
      )}
    </Grid>
  );

  return (
    <BoxStyled>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Question {index + 1}: &nbsp;</span>
            {question.content}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {typequestion}
        </Grid>
      </Grid>
    </BoxStyled>
  );
};

const Answer = styled(Button)({
  backgroundColor: 'rgba(0,0,0,0.7)',
  color: '#fff',
  width: '100%',
  borderRadius: '8px',
  padding: '8px 16px',
  cursor: 'pointer',
  transition: 'all .1s ease',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  '.btn-active': {
    backgroundColor: '#62c370',
    boxShadow: '0 0 0 0 #3fa64e',
  },
});

const TextFieldStyle = styled(Input)({
  color: '#fff',
  width: '50%',
});

export default Questions;
