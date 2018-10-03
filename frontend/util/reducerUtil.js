const parseDateToMilliseconds = (stringDate) => {
  const parsedDate = Date.parse(stringDate);
  if (Number.isNaN(parsedDate) || !stringDate) {
    return 0;
  }

  return parsedDate;
};

const parseHasUnreads = ({ lastActive, lastRead }) => {
  const active = parseDateToMilliseconds(lastActive);
  const read = parseDateToMilliseconds(lastRead);

  return active > read;
};

export default parseHasUnreads;
