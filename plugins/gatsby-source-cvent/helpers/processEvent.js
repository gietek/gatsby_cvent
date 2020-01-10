const getAttributes = require('./getAttributes');
const {
  EVENT_ATTRIBUTES,
  EVENT_TYPE,
  FEE_ATTRIBUTES,
  PRODUCT_ATTRIBUTES,
} = require('../consts');

const processEvent = (event, eventDetails, createNodeId, createContentDigest) => {
  const attributes = getAttributes(event, EVENT_ATTRIBUTES);

  const fees = eventDetails.fees.map(item => getAttributes(item, FEE_ATTRIBUTES));
  const staffDetail = eventDetails.staffDetail.map(item => getAttributes(item));
  const products = event.ProductDetail && event.ProductDetail.length ?
    event.ProductDetail.map(item => getAttributes(item, PRODUCT_ATTRIBUTES)) :
    [];

  const nodeId = createNodeId(`${EVENT_TYPE}-${attributes.id}`)
  const nodeData = {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: EVENT_TYPE,
      content: '',
      contentDigest: createContentDigest(event),
    },
    attributes,
    fees,
    products,
    staffDetail,
  };

  return nodeData;
};

module.exports = processEvent;
