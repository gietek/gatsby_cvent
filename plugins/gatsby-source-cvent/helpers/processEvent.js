const processEvent = (event, createNodeId, createContentDigest) => {
  const attr = event._attributes;
  const id = attr.Id;

  const attributes = {
    title: attr.EventTitle,
    startDate: attr.EventStartDate,
    endDate: attr.EventEndDate,
    location: attr.Location,
    address1: attr.StreetAddress1,
    address2: attr.StreetAddress2,
    address3: attr.StreetAddress3,
    city: attr.City,
    state: attr.State,
    stateCode: attr.StateCode,
    postalCode: attr.PostalCode,
    country: attr.Country,
    countryCode: attr.CountryCode,
  };

  const productDetails = event.ProductDetail && event.ProductDetail.length ?
    event.ProductDetail.map(product => product._attributes) : [];

  const nodeId = createNodeId(`cvent-${id}`)
  const nodeContent = JSON.stringify(event)
  const nodeData = Object.assign({}, event, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: `CventEvent`,
      content: nodeContent,
      contentDigest: createContentDigest(event),
    },
    attributes,
    productDetails,
  })
  return nodeData
};

module.exports = processEvent;
