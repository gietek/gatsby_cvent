const {
  callSOAP,
  getResult,
  fetchSpeakersAction,
} = require('../methods');

const fetchSpeakers = async (sessionHeader, speakerIds) => {

  const idsXML = speakerIds.map(id => `<ns1:Id>${id}</ns1:Id>`);

  const xml = fetchSpeakersAction.xml
    .replace('%%SESSION%%', sessionHeader)
    .replace('%%OBJECT_TYPE%%', 'Speaker')
    .replace('%%SPEAKER_IDS%%', idsXML);

  const response = await callSOAP(fetchSpeakersAction.url, xml);
  const data = getResult(response, fetchSpeakersAction.responsePath);

  return data;
};

module.exports = fetchSpeakers;
