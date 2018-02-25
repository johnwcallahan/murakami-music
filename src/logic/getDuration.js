export default function getDuration(track) {
  let duration_ms = track["duration_ms"];
  return msToMinutesAndSeconds(duration_ms);
}

function msToMinutesAndSeconds(ms) {
  let minutes = Math.floor(ms/60000);
  let seconds = ((ms%60000)/1000).toFixed(0);
  return (seconds == 60
    ? (minutes+1) + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
}