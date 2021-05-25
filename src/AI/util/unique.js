const unique = (array) => {
  return array.reduce((acc, item) => {
    return acc.includes(item) ? acc : [...acc, item];
  }, []);
};

export default unique;
