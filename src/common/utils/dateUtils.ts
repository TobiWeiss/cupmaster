//assume this is UTC
/**
 * Format a date to a string in the local timezone
 * @param date a date in UTC
 * @returns a string in the local timezone
 */
export const formatDate = (date: Date): string => {
  //convert to local time
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  return new Intl.DateTimeFormat('default', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
  }).format(localDate);
}; 