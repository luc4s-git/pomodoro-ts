export function formatTime(seconds: number): string {
  const setZero = (n: number) => Math.floor(n).toString().padStart(2, '0');
  const min = setZero((seconds / 60) % 60);
  const sec = setZero((seconds % 60) % 60);
  return `${min}:${sec}`;
}
