const getAttributes = require('./getAttributes');
const forceArray = require('./forceArray');
const {
  EVENT_ATTRIBUTES,
  EVENT_TYPE,
  FEE_ATTRIBUTES,
  PRODUCT_ATTRIBUTES,
} = require('../consts');

const processEvent = ({
  event,
  details,
  sessions,
  createNodeId,
  createContentDigest
}) => {
  const attributes = getAttributes(event, EVENT_ATTRIBUTES);

  const fees = details.fees.map(item => getAttributes(item, FEE_ATTRIBUTES));
  const staffDetail = details.staffDetail.map(item => getAttributes(item));
  const products = forceArray(event.ProductDetail).map(item => {
    const productAttributes = getAttributes(item, PRODUCT_ATTRIBUTES);
    productAttributes.speakers = sessions[productAttributes.productId] || [];

    return productAttributes;
  });

  const customFields = forceArray(event.CustomFieldDetail).map(item => getAttributes(item));

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
    customFields,
    fees,
    products,
    staffDetail,
  };

  return nodeData;
};

module.exports = processEvent;
