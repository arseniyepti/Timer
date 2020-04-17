const getMinutes = (milliseconds) => {
  const min = Math.floor(Math.floor(milliseconds / 1000) / 60);
  return min < 10 ? `0${min}` : min;
};
const getSeconds = (milliseconds) => {
  const min = Math.floor(Math.floor(milliseconds / 1000) / 60);
  const sec = Math.floor(milliseconds / 1000) - min * 60;
  return sec < 10 ? `0${sec}` : sec;
};
const getMilliseconds = (milliseconds) => {
  const min = Math.floor(Math.floor(milliseconds / 1000) / 60);
  const sec = Math.floor(milliseconds / 1000) - min * 60;
  const millisec = Math.floor((milliseconds - sec * 1000 - min * 60 * 1000) / 10);
  return millisec < 10 ? `0${millisec}` : millisec;
};
const generatePercent = (milliseconds, disableControl, value) => {
  const result = milliseconds <= 0 ? 0 : Math.floor(100 - (milliseconds * 100) / value);
  return disableControl ? result : 0;
};
const generateSliderValue = (minutes, seconds) => {
  const sliderValue = minutes * 60 + seconds;
  return sliderValue > 3600 ? 3600 : sliderValue;
};
export { getMinutes, getSeconds, getMilliseconds, generatePercent, generateSliderValue };
