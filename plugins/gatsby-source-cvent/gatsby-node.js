require('dotenv').config();

const login = require('./helpers/login');
const listEventIds = require('./helpers/listEventIds');
const fetchEvent = require('./helpers/fetchEvent');

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  reporter,
}, configOptions) => {
  const {
    createNode
  } = actions;

  const sessionHeader = await login(configOptions);
  const eventIds = await listEventIds(sessionHeader);

  const eventPromises = eventIds.map(eventId => fetchEvent(sessionHeader, eventId));
  const eventsList = await Promise.all(eventPromises);

  console.log({
    eventsList
  });

  return eventsList;
}
