const forceArray = (source) => {
  if (Array.isArray(source)) {
    return source;
  }

  if (!source) {
    return [];
  }

  return [source];
};

module.exports = forceArray;
