const getAttributes = require('./getAttributes');

const processEvent = (event, createNodeId, createContentDigest) => {
  const attributes = getAttributes(event);
  const id = attributes.Id;

  const productDetails = event.ProductDetail && event.ProductDetail.length ?
    event.ProductDetail.map(product => getAttributes(product)) : [];

  const nodeId = createNodeId(`cvent-${id}`)
  const nodeContent = JSON.stringify(event)
  const nodeData = Object.assign({}, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: `CventEvent`,
      content: nodeContent,
      contentDigest: createContentDigest(event),
    },
    attributes,
    productDetails,
  })
  return nodeData
};

module.exports = processEvent;
