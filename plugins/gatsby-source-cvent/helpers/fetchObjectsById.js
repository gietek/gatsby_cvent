const {
  callSOAP,
  getResult,
  fetchObjectsByIdsAction,
} = require('../methods');

const fetchObjectsById = async (sessionHeader, identifiers, type) => {

  const idsXML = identifiers.map(id => `<ns1:Id>${id}</ns1:Id>`);

  const xml = fetchObjectsByIdsAction.xml
    .replace('%%SESSION%%', sessionHeader)
    .replace('%%OBJECT_TYPE%%', type)
    .replace('%%OBJECT_IDS%%', idsXML);

  const response = await callSOAP(fetchObjectsByIdsAction.url, xml);
  const data = getResult(response, fetchObjectsByIdsAction.responsePath);

  return data;
};

module.exports = fetchObjectsById;
