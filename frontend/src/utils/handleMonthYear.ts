export const handleMonthYear = (date: string): string => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return ` ${monthNames[new Date(date).getUTCMonth()]}, ${new Date(
    date
  ).getFullYear()}`;
};
