import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import { ExamContent, SidebarRight, SidebarLeft } from '../components/examroom';

//api
import questionAPI from '../apis/questionAPI';
//component
import Loading from '../components/Loading';

const ExamRoom = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestionList = async () => {
      try {
        const response = await questionAPI.findAll();
        setQuestions(response);
      } catch (error) {
        console.log('Failed to fetch news list: ', error);
      }
    };

    fetchQuestionList();
  }, []);
  return (
    <>
      {questions.data && (
        <RootStyle>
          <SidebarLeft questions={questions.data} />
          <ExamContent questions={questions.data} />
          <SidebarRight questions={questions.data} />
        </RootStyle>
      )}
      {!questions.data && <Loading />}
    </>
  );
};

const RootStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export default ExamRoom;
