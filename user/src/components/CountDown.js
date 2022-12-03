import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { styled } from '@mui/material';

// utils
import { fTime } from '../utils/formatTime';
import { PATH_MAIN } from '../routes/path';

const CountDown = ({ countdown }) => {
  const { time, type } = countdown;
  const [cdNumber, setCdNumber] = useState(time);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCdNumber((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (cdNumber <= 0) {
    if (type === 'finish') {
      return <Navigate to={PATH_MAIN.score} />;
    }
    return <Navigate to={PATH_MAIN.home} />;
  }

  return (
    <CountDownStyle>
      <CdNumberStyle>{fTime(cdNumber)}</CdNumberStyle>
    </CountDownStyle>
  );
};

const CountDownStyle = styled('div')({
  position: 'relative',
  margin: 'auto',
  textAlign: 'center',
});

const CdNumberStyle = styled('div')({
  color: 'white',
  display: 'inline-block',
  lineHeight: '55px',
  fontSize: '50px',
});

export default CountDown;
