const {
  callSOAP,
  getResult,
  listAction,
} = require('../methods');

const CONSTS = require('../consts');

const listSpeakerIds = async (sessionHeader) => {
  const xml = listAction.xml
    .replace('%%SESSION%%', sessionHeader)
    .replace('%%OBJECT_TYPE%%', 'Speaker')
    .replace('%%START_DATE%%', CONSTS.DATE_RANGES[0])
    .replace('%%END_DATE%%', CONSTS.DATE_RANGES[1]);

  const response = await callSOAP(listAction.url, xml);
  const data = getResult(response, listAction.responsePath);

  const ids = data.map(item => item._text);

  return ids;
};

module.exports = listSpeakerIds;
