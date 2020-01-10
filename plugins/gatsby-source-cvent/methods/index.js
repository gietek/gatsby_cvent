const soapRequest = require('easy-soap-request');
const xmlParser = require('xml-js');

const loginAction = require('./login');
const listAction = require('./list');
const fetchObjectAction = require('./fetchObject');
const fetchSpeakersAction = require('./fetchSpeakers');

const headers = {
  'Content-Type': 'text/xml;charset=UTF-8',
};

const callSOAP = async (url, xml) => {
  const {
    response
  } = await soapRequest({
    url: url,
    headers: headers,
    xml: xml
  });
  const {
    body
  } = response;

  const json = xmlParser.xml2json(body, {
    compact: true
  });
  const data = JSON.parse(json);

  return data['soap:Envelope']['soap:Body'];
};

const getResult = (obj, path) => {
  const pathTokens = path.split('.');
  return pathTokens.reduce((acc, token) => {
    if (acc === null) {
      return null;
    }

    return acc[token] || null;
  }, obj);
}

module.exports = {
  callSOAP,
  getResult,
  loginAction,
  listAction,
  fetchObjectAction,
  fetchSpeakersAction,
};
