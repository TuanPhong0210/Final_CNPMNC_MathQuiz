export const fTime = (_seconds) => {
  var hours = Math.floor(_seconds / 3600);
  var minutes = Math.floor((_seconds - hours * 3600) / 60);
  var seconds = _seconds - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return `${hours}:${minutes}:${seconds}`;
};

// time: hh:mm:ss
export const timeToSeconds = (time) => {
  const [hours, minutes, seconds] = time.split(':');
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
};

export const getDiffTimeToNowInSeconds = (time) => {
  return Math.floor((new Date(time).getTime() - new Date().getTime()) / 1000);
};
