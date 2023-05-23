import { handleMonthYear } from './handleMonthYear';

export const handleEndDate = (endDate?: string): string => {
  if (endDate) {
    return handleMonthYear(endDate);
  }
  return 'current';
};
