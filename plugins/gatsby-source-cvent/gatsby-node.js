require('dotenv').config();

const login = require('./helpers/login');
const listEventIds = require('./helpers/listEventIds');

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

  // eventIds.map(async (eventId) => {

  // });

  console.log({
    eventIds
  });

  return;
}
