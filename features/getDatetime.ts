const getDatetime = (s: string): string => {
  const year = s.slice(0, 4);
  const month = s.slice(5, 7);
  const day = s.slice(8, 10);
  const time = s.slice(11, 16);
  const date = `${year}/${month}/${day} ${time}`;
  return date;
};

export default getDatetime;
