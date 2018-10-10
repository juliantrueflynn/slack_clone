export const parseDateToMilliseconds = (stringDate) => {
  const parsedDate = Date.parse(stringDate);
  if (Number.isNaN(parsedDate) || !stringDate) {
    return 0;
  }

  return parsedDate;
};

export const isDateOlderThanOther = (dateStringA, dateStringB) => {
  const a = parseDateToMilliseconds(dateStringA);
  const b = parseDateToMilliseconds(dateStringB);
  return b > a;
};

const getOrdinal = (int) => {
  const remainder10 = int % 10;
  const remainder100 = int % 100;

  if (remainder10 === 1 && remainder100 !== 11) {
    return `${int}st`;
  }

  if (remainder10 === 2 && remainder100 !== 12) {
    return `${int}nd`;
  }

  if (remainder10 === 3 && remainder100 !== 13) {
    return `${int}rd`;
  }

  return `${int}th`;
};

export const parseDateToOrdinalDay = (date) => {
  const day = date.getDate();
  return getOrdinal(day);
};

export const parseDateToMonthName = date => (
  date.toLocaleString('en-US', { month: 'long' })
);

export const parseToLocalTime = date => (
  date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
);

export const isDateToday = (date) => {
  const today = new Date();
  return today.toDateString() === date.toDateString();
};

export const getMonthDayYear = (date) => {
  const monthName = parseDateToMonthName(date);
  const day = date.getDate();
  const year = date.getFullYear();

  return `${monthName} ${day}, ${year}`;
};

export const dateUtil = (dateString) => {
  const date = new Date(dateString);

  return {
    localTime: () => parseToLocalTime(date),
    dayOrdinal: () => parseDateToOrdinalDay(date),
    monthName: () => parseDateToMonthName(date),
    monthDayYear: () => getMonthDayYear(date),
    isToday: () => isDateToday(date),
  };
};
