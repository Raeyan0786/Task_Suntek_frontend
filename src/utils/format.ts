export const secondsToHHMM = (s: number) => {
  const hrs = Math.floor(s/3600)
  const mins = Math.floor((s%3600)/60)
  const secs = s%60
  return `${hrs}h ${mins}m ${secs}s`
}
