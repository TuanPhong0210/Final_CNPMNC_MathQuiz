import { Box } from '@mui/material';
import { Element } from 'react-scroll';

// component
import Question from './Question';

const ExamContent = ({ questions, selected, onSelected }) => {
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
      <Element className="element scrollbar" id="containerElement">
        <div className="force-overflow" id="style-1">
          {questions.map((question, index) => {
            const { _id } = question;
            return (
              <Question
                key={index}
                index={index}
                question={question}
                selectedValue={selected[_id]}
                onSelected={onSelected}
              />
            );
          })}
        </div>
      </Element>
    </Box>
  );
};

export default ExamContent;
