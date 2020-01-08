require('dotenv').config();

const login = require('./helpers/login');
const listEventIds = require('./helpers/listEventIds');
const fetchEvent = require('./helpers/fetchEvent');
const processEvent = require('./helpers/processEvent');

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  reporter,
}, configOptions) => {
  const {
    createNode
  } = actions;

  delete configOptions.plugins;

  const sessionHeader = await login(configOptions, reporter);
  const eventIds = await listEventIds(sessionHeader);

  const eventPromises = eventIds.map(eventId => fetchEvent(sessionHeader, eventId));
  const eventsList = await Promise.all(eventPromises);
  console.log(eventsList);

  eventsList.forEach(event => {
    const nodeData = processEvent(event, createNodeId, createContentDigest);
    createNode(nodeData);
  });

  return eventsList;
}
