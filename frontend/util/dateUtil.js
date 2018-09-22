const parseDateToMilliseconds = (stringDate) => {
  const parsedDate = Date.parse(stringDate);
  if (Number.isNaN(parsedDate)) {
    return 0;
  }

  return parsedDate;
};

export default parseDateToMilliseconds;
