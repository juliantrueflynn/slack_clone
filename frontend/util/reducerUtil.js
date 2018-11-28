export const pushReduce = (acc, curr) => {
  if (!acc.includes(curr)) {
    acc.push(curr);
  }

  return acc;
};

export const filterPop = (arr, matchKey) => arr.filter(key => key !== matchKey);
