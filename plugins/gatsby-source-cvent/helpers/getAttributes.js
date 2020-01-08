const getAttributes = (node) => {
  if (!node || !node._attributes) {
    return {};
  }

  return Object.keys(node._attributes).reduce((accumulator, key) => {
    const newKey = key[0].toLowerCase() + key.substring(1);
    accumulator[newKey] = node._attributes[key];

    return accumulator;
  }, {});
};

module.exports = getAttributes;
