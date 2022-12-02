import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import { fTime } from '../utils/formatTime';

const CountDown = ({ countdown }) => {
  const [cdNumber, setCdNumber] = useState(countdown);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCdNumber((prevCount) => prevCount - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (cdNumber === 0) {
    window.location = 'http://localhost:3000/examroom';
  }

  return (
    <CountDownStyle countdown={countdown}>
      <CdNumberStyle>{fTime(cdNumber)}</CdNumberStyle>
      <svg>
        <circle r="25" cx="26" cy="26"></circle>
      </svg>
    </CountDownStyle>
  );
};

const CountDownStyle = styled('div')(({ countdown }) => ({
  position: 'relative',
  margin: 'auto',
  height: '55px',
  width: '55px',
  textAlign: 'center',
  '@keyframes countdown': {
    from: {
      strokeDashoffset: '0px',
    },
    to: {
      strokeDashoffset: '113px',
    },
  },
  svg: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '55px',
    height: '55px',
    transform: 'rotateY(-180deg) rotateZ(-90deg)',
  },
  'svg circle': {
    strokeDasharray: '155px',
    strokeDashoffset: '0px',
    strokeLinecap: 'round',
    strokeWidth: '2px',
    stroke: 'white',
    fill: 'none',
    animation: `countdown ${countdown}s linear infinite forwards`,
  },
}));

const CdNumberStyle = styled('div')({
  color: 'white',
  display: 'inline-block',
  lineHeight: '55px',
});

export default CountDown;
