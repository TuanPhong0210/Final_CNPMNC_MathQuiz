import { Box } from '@mui/material';
import Questions from './Questions';

const ExamContent = ({ questions }) => {
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
      <div class="scrollbar" id="style-1">
        <div class="force-overflow">
          {questions.map((question, index) => (
            <Questions key={index} question={question} index={index} />
          ))}
        </div>
      </div>
    </Box>
  );
};

export default ExamContent;
