require('dotenv').config();

const login = require('./helpers/login');
const listEventIds = require('./helpers/listEventIds');
const listSpeakerIds = require('./helpers/listSpeakerIds');
const processEvent = require('./helpers/processEvent');
const fetchObjectsById = require('./helpers/fetchObjectsById');
const convertSpeakers = require('./helpers/convertSpeakers');
const forceArray = require('./helpers/forceArray');

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

  const createNodes = async () => {
    const sessionHeader = await login(configOptions, reporter);
    const eventIds = await listEventIds(sessionHeader);
    const details = eventIds.reduce((accumulator, id) => {
      accumulator[id] = {
        fees: [],
        staffDetail: [],
      };
      return accumulator;
    }, {});

    const eventsList = await fetchObjectsById(sessionHeader, eventIds, 'Event');
    const eventsDetailsList = await fetchObjectsById(sessionHeader, eventIds, 'EventDetail');

    const speakerIds = await listSpeakerIds(sessionHeader);
    const speakersData = await fetchObjectsById(sessionHeader, speakerIds, 'Speaker');
    const sessionSpeakers = convertSpeakers(speakersData);

    forceArray(eventsDetailsList).forEach(item => {
      const eventId = item._attributes.Id;

      if (item.StaffDetail) {
        details[eventId].staffDetail = forceArray(item.StaffDetail);
      }
      if (item.Fees) {
        details[eventId].fees = forceArray(item.Fees);
      }
    });

    forceArray(eventsList).forEach(event => {
      const eventId = event._attributes.Id;
      const nodeData = processEvent({
        event,
        details: details[eventId],
        sessions: sessionSpeakers,
        createNodeId,
        createContentDigest,
      });

      createNode(nodeData);
    });

  };

  return createNodes();
}
