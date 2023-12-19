const amountOfHoursCalc = (amount: number, of: string) => {
  if (of === 'hours') return amount;
  if (of === 'days') return amount * 24;
  if (of === 'weeks') return amount * 24 * 7;
  if (of === 'months') return amount * 24 * 30;
  return amount;
};

export { amountOfHoursCalc };
