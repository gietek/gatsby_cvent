const url = 'https://sandbox-api.cvent.com/soap/V200611.ASMX?op=Login';

const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ns="http://api.cvent.com/2006-11">
<soapenv:Header/>
<soapenv:Body>
   <ns:Login>
      <ns:AccountNumber>%%CVENT_ACCOUNT%%</ns:AccountNumber>
      <ns:UserName>%%CVENT_USERNAME%%</ns:UserName>
      <ns:Password>%%CVENT_PASSWORD%%</ns:Password>
   </ns:Login>
</soapenv:Body>
</soapenv:Envelope>`;

const responsePath = 'LoginResponse.LoginResult._attributes';

module.exports = {
  url,
  xml,
  responsePath
};
