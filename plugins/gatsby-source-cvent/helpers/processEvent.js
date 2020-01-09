const getAttributes = require('./getAttributes');
const {
  EVENT_ATTRIBUTES,
  EVENT_TYPE,
} = require('../consts');

const processEvent = (event, createNode, createNodeId, createContentDigest) => {
  const attributes = getAttributes(event, EVENT_ATTRIBUTES);

  const nodeId = createNodeId(`cvent-${attributes.id}`)
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
  });

  createNode(nodeData);
};

module.exports = processEvent;
