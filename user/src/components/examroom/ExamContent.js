import { Box } from '@mui/material';
import { useState } from 'react';
import Questions from './Questions';

const ExamContent = ({ questions }) => {
  const [questionSelected, setQuestionSelected] = useState(() => {
    const storageSelected = JSON.parse(localStorage.getItem('selected'));
    return storageSelected ?? [];
  });

  const callbackFunction = (childData) => {
    const checkedId = questionSelected.find((item) => item.question_id === childData.question_id);
    if (checkedId) {
      setQuestionSelected(
        questionSelected.filter((item) => item.question_id !== childData.question_id)
      );
    }
    setQuestionSelected((prev) => {
      const newSelected = [...prev, childData];
      const jsonSelected = JSON.stringify(newSelected);
      localStorage.setItem('selected', jsonSelected);
      return newSelected;
    });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        margin: '0 20px',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: '16px',
        height: 'calc(100vh - 104px)',
      }}
    >
      <div className="scrollbar" id="style-1">
        <div className="force-overflow">
          {questions.map((question, index) => (
            <Questions
              key={index}
              question={question}
              index={index}
              parentCallback={callbackFunction}
            />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default ExamContent;
