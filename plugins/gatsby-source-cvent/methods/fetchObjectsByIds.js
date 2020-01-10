const url = 'https://sandbox-api.cvent.com/soap/V200611.ASMX?op=Retrieve';

const xml = `
<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://api.cvent.com/2006-11" xmlns:ns1="http://schemas.cvent.com/api/2006-11">
   <soap:Header>
      <ns:CventSessionHeader>
         <ns:CventSessionValue>%%SESSION%%</ns:CventSessionValue>
      </ns:CventSessionHeader>
   </soap:Header>
   <soap:Body>
      <ns:Retrieve>
         <ns:ObjectType>%%OBJECT_TYPE%%</ns:ObjectType>
         <ns1:Ids>
            %%OBJECT_IDS%%
         </ns1:Ids>
      </ns:Retrieve>
   </soap:Body>
</soap:Envelope>
`;

const responsePath = 'RetrieveResponse.RetrieveResult.CvObject';

module.exports = {
  url,
  xml,
  responsePath
};
