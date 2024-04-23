export function formatTime(seconds: number): string {
  const setZero = (n: number) => Math.floor(n).toString().padStart(2, '0');
  const min = setZero((seconds / 60) % 60);
  const sec = setZero((seconds % 60) % 60);
  return `${min}:${sec}`;
}

export function secondsToTime(seconds: number): string {
  const setZero = (n: number) => Math.floor(n).toString().padStart(2, '0');
  const hours = setZero(seconds / 3600);
  const min = setZero((seconds / 60) % 60);
  const sec = setZero((seconds % 60) % 60);
  return `${hours}:${min}:${sec}`;
}
