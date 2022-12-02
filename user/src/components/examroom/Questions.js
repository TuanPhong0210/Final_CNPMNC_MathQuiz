import { Grid, styled, Input, Typography, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import BoxStyled from '../BoxStyled';

const Questions = ({ question, index, parentCallback }) => {
  const question_id = question._id;
  const answers = question.options;
  const [checkedSingle, setCheckedSingle] = useState(() => {
    const storageSelected = JSON.parse(localStorage.getItem('selected'));
    const checkedId = storageSelected.find((item) => item.question_id === question._id);
    return checkedId.checkedSingle;
  });
  const [checkedMultiple, setCheckedMultiple] = useState(() => {
    const storageSelected = JSON.parse(localStorage.getItem('selected'));
    const checkedId = storageSelected.find((item) => item.question_id === question._id);
    return checkedId.checkedMultiple;
  });
  const [textAnswer, setTextAnswer] = useState(() => {
    const storageSelected = JSON.parse(localStorage.getItem('selected'));
    const checkedId = storageSelected.find((item) => item.question_id === question._id);
    return checkedId.textAnswer;
  });

  useEffect(() => {
    if (checkedSingle) {
      parentCallback({ question_id, checkedSingle });
    } else if (textAnswer) {
      parentCallback({ question_id, textAnswer });
    } else if (checkedMultiple) {
      parentCallback({ question_id, checkedMultiple });
    }
  }, [checkedSingle, checkedMultiple, textAnswer]);

  const handleCheckSingle = (value) => {
    setCheckedSingle(value);
  };

  const handleCheckMultiple = (value) => {
    setCheckedMultiple((prev) => {
      const isChecked = checkedMultiple.includes(value);
      if (isChecked) {
        return checkedMultiple.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleInput = (e) => {
    setTextAnswer(e.target.value);
  };

  const typequestion = (
    <Grid container spacing={2}>
      {question.type === 'SINGLE' &&
        answers.map((answer, index) => {
          return (
            <Grid key={index} item xs={6}>
              <Answer
                className={checkedSingle === answer.value ? 'btn-active' : ''}
                onClick={() => handleCheckSingle(answer.value)}
              >
                {answer.ans}
              </Answer>
            </Grid>
          );
        })}
      {question.type === 'MULTIPLE' &&
        answers.map((answer, index) => {
          return (
            <Grid key={index} item xs={6}>
              <Answer
                className={checkedMultiple.includes(answer.value) ? 'btn-active' : ''}
                onClick={() => handleCheckMultiple(answer.value)}
              >
                {answer.ans}
              </Answer>
            </Grid>
          );
        })}
      {question.type === 'TEXT' && (
        <Grid item xs={12}>
          <TextFieldStyle
            placeholder="Enter your results here"
            value={textAnswer}
            inputprops={{
              style: { color: '#fff' },
            }}
            onChange={(e) => handleInput(e)}
          />
        </Grid>
      )}
    </Grid>
  );

  return (
    <BoxStyled question_id={question._id}>
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
});

const TextFieldStyle = styled(Input)({
  color: '#fff',
  width: '50%',
});

export default Questions;
