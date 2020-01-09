const getAttributes = require('./getAttributes');
const {
  EVENT_ATTRIBUTES,
  EVENT_TYPE,
} = require('../consts');

const processEvent = (event, createNodeId, createContentDigest) => {
  const attributes = getAttributes(event, EVENT_ATTRIBUTES);

  const nodeId = createNodeId(`${EVENT_TYPE}-${attributes.id}`)
  const nodeContent = JSON.stringify(event)
  const nodeData = Object.assign({}, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: EVENT_TYPE,
      content: nodeContent,
      contentDigest: createContentDigest(event),
    },
    attributes,
    products: [],
  });

  if (event.ProductDetail && event.ProductDetail.length) {
    event.ProductDetail.map(product => {
      const productAttributes = getAttributes(product);
      nodeData.products.push(productAttributes);
    });
  }

  return nodeData;
};

module.exports = processEvent;
