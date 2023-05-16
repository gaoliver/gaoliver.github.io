type EndDateProps = {
  month?: string;
  year?: number;
};

export const handleEndDate = (endDate?: EndDateProps): string => {
  if (endDate) {
    return ` ${endDate.month}, ${endDate.year}`;
  }
  return 'current';
};
