import { Grid, styled, Input, Typography, Button } from '@mui/material';
import { useState } from 'react';

// components
import BoxStyled from '../BoxStyled';
// constant
import { TYPES } from '../../constant';

const Questions = ({ index, question, selectedValue, onSelected }) => {
  const [textValue, setTextValue] = useState(selectedValue || '');
  const { _id, type, options } = question;

  const questionRender = (
    <Grid container spacing={2}>
      {type === TYPES.SINGLE &&
        options.map((option, index) => {
          const { ans, value } = option;
          return (
            <Grid key={index} item xs={6}>
              <Answer
                className={selectedValue === value ? 'btn-active' : ''}
                onClick={() => onSelected(_id, value, type)}
              >
                {ans}
              </Answer>
            </Grid>
          );
        })}
      {type === TYPES.MULTIPLE &&
        options.map((option, index) => {
          const { ans, value } = option;
          return (
            <Grid key={index} item xs={6}>
              <Answer
                className={selectedValue?.split('-').includes(value) ? 'btn-active' : ''}
                onClick={() =>
                  onSelected(
                    _id,
                    [...(selectedValue ? selectedValue.split('-') : []), value].join('-'),
                    type
                  )
                }
              >
                {ans}
              </Answer>
            </Grid>
          );
        })}
      {type === TYPES.TEXT && (
        <Grid item xs={12}>
          <TextFieldStyle
            placeholder="Enter your results here"
            value={textValue}
            inputprops={{
              style: { color: '#fff' },
            }}
            onBlur={() => onSelected(_id, textValue, type)}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </Grid>
      )}
    </Grid>
  );

  return (
    <BoxStyled id={_id} question_id={question._id}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Question {index + 1}: &nbsp;</span>
            {question.content}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {questionRender}
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
