const {
  callSOAP,
  getResult,
  fetchObjectAction,
} = require('../methods');

const fetchEventDetails = async (sessionHeader, eventId) => {
  const xml = fetchObjectAction.xml
    .replace('%%SESSION%%', sessionHeader)
    .replace('%%OBJECT_TYPE%%', 'EventDetail')
    .replace('%%OBJECT_ID%%', eventId);

  const response = await callSOAP(fetchObjectAction.url, xml);
  const data = getResult(response, fetchObjectAction.responsePath);

  return data;
};

module.exports = fetchEventDetails;
