const url = 'https://sandbox-api.cvent.com/soap/V200611.ASMX?op=GetUpdated';

const xml = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://api.cvent.com/2006-11">
<soap:Header>
   <ns:CventSessionHeader>
      <ns:CventSessionValue>%%SESSION%%</ns:CventSessionValue>
   </ns:CventSessionHeader>
</soap:Header>
<soap:Body>
   <ns:GetUpdated>
      <ns:ObjectType>Event</ns:ObjectType>
      <ns:StartDate>%%START_DATE%%</ns:StartDate>
      <ns:EndDate>%%END_DATE%%</ns:EndDate>
   </ns:GetUpdated>
</soap:Body>
</soap:Envelope>`;

const responsePath = 'GetUpdatedResponse.GetUpdatedResult.Id';

module.exports = {
  url,
  xml,
  responsePath
};
