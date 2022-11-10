export function convertMinutesToHourString(minutes: number) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
    2,
    "0"
  )}`;

  return time;
}
