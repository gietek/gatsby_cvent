const {
  callSOAP,
  getResult,
  loginAction,
} = require('../methods');

const login = async (configOptions) => {
  const xml = loginAction.xml
    .replace('%%CVENT_ACCOUNT%%', configOptions.account)
    .replace('%%CVENT_USERNAME%%', configOptions.username)
    .replace('%%CVENT_PASSWORD%%', configOptions.password);

  const response = await callSOAP(loginAction.url, xml);
  const data = getResult(response, loginAction.responsePath);

  if (data.LoginSuccess !== 'true') {
    reporter.panic('Cannot login to Cvent', new Error(JSON.stringify(data)));
    return
  }

  return data.CventSessionHeader;
};

module.exports = login;
