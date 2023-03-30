import date from 'date-and-time';

export const formatSipRequestDateTime = (request_date: Date = new Date()) => {
  return date.format(request_date, 'yyyymmdd    HHMMss');
};

export const parseSipResponseDateTime = (value: string) => {
  const year = Number.parseInt(value.slice(0, 4), 10);
  const month = Number.parseInt(value.slice(4, 6), 10) - 1;
  const day = Number.parseInt(value.slice(6, 8), 10);
  const hours = Number.parseInt(value.slice(12, 14), 10);
  const minutes = Number.parseInt(value.slice(14, 16), 10);
  const seconds = Number.parseInt(value.slice(16, 18), 10);
  return new Date(year, month, day, hours, minutes, seconds);
};

export const daysFromNow = (numberDays: number) => {
  const date = new Date();
  date.setDate(date.getDate() + numberDays);
  return date;
};

export const isValidDate = (d: any) => {
  return d instanceof Date && !Number.isNaN(d.valueOf());
};
