require('dotenv').config();

const login = require('./helpers/login');
const listEventIds = require('./helpers/listEventIds');
const listSpeakerIds = require('./helpers/listSpeakerIds');
const fetchEvent = require('./helpers/fetchEvent');
const fetchEventDetails = require('./helpers/fetchEventDetails');
const processEvent = require('./helpers/processEvent');
const fetchSpeakers = require('./helpers/fetchSpeakers');
const convertSpeakers = require('./helpers/convertSpeakers');

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

    const eventsList = await Promise.all(
      eventIds.map(eventId => fetchEvent(sessionHeader, eventId))
    );
    const eventsDetailsList = await Promise.all(
      eventIds.map(eventId => fetchEventDetails(sessionHeader, eventId))
    );

    const speakerIds = await listSpeakerIds(sessionHeader);
    const speakersData = await fetchSpeakers(sessionHeader, speakerIds);
    const sessionSpeakers = convertSpeakers(speakersData);

    eventsDetailsList.forEach(item => {
      const eventId = item._attributes.Id;

      if (item.StaffDetail) {
        details[eventId].staffDetail = item.StaffDetail;
      }
      if (item.Fees) {
        details[eventId].fees = item.Fees;
      }
    });

    eventsList.forEach(event => {
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
