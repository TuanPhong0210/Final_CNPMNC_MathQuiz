import { useState, useEffect } from 'react';
import { styled } from '@mui/material';

// constant
import { TYPES } from '../../constant';
//
import ExamContent from './ExamContent';
import SidebarRight from './SidebarRight';
import SidebarLeft from './SidebarLeft';

const ExamRoom = ({ questions, countdown, examTime, supervisor }) => {
  const [selected, setSelected] = useState(() => {
    const storage = JSON.parse(localStorage.getItem('selected'));
    return storage ?? {};
  });
  useEffect(() => {
    window.addEventListener('beforeunload', (e) => {
      e.preventDefault();
      e.returnValue = '';
    });
    return () => {
      window.removeEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.returnValue = '';
      });
    };
  }, []);

  const buildMatchValue = (questionId, value, type) => {
    const lastSelect = value.split('-').pop();
    const values = selected[questionId]?.split('-') || [];
    const result = values.includes(lastSelect)
      ? values.filter((v) => v !== lastSelect)
      : type === TYPES.MULTIPLE
      ? [...values, lastSelect]
      : [lastSelect];
    return result.sort().join('-');
  };

  const handleSelected = (questionId, newValue, type) => {
    if (!type || !TYPES[type]) {
      console.log('Type not match!');
      return;
    }

    const matchedValue = buildMatchValue(questionId, newValue, type);
    const newSelected = {
      ...selected,
      [questionId]: matchedValue,
    };

    localStorage.setItem('selected', JSON.stringify(newSelected));
    setSelected(newSelected);
  };

  return (
    <RootStyle>
      <SidebarLeft questions={questions} selected={selected} />
      <ExamContent questions={questions} selected={selected} onSelected={handleSelected} />
      <SidebarRight
        questions={questions}
        selected={selected}
        countdown={countdown}
        examTime={examTime}
        supervisor={supervisor}
      />
    </RootStyle>
  );
};

const RootStyle = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
});

export default ExamRoom;
