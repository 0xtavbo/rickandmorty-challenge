export function formatTime(time) {
  const seconds = Math.floor(time / 1000);
  const miliseconds = seconds < 1 ? time.toFixed(6) : (time % 1000).toFixed(6);

  return seconds + "s " + miliseconds + "ms";
}
