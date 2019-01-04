const parseDateToMilliseconds = (stringDate) => {
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

const parseDateToOrdinalDay = (date) => {
  const day = date.getDate();
  return getOrdinal(day);
};

const parseDateToMonthName = (date, args) => {
  const dateArgs = args || { month: 'long' };

  return date.toLocaleString('en-US', dateArgs);
};

const parseToLocalTime = date => (
  date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
);

const isDateToday = (date) => {
  const today = new Date();
  return today.toDateString() === date.toDateString();
};

const getMonthDayYear = (date) => {
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
    monthName: args => parseDateToMonthName(date, args),
    monthDayYear: () => getMonthDayYear(date),
    isToday: () => isDateToday(date),
  };
};
