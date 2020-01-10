const DATE_RANGES = ['2010-01-01', '2050-12-31'];
const EVENT_ATTRIBUTES = [
  'Id',
  'EventTitle',
  'EventStartDate',
  'EventEndDate',
  'EventDescription',
  'Location',
  'StreetAddress1',
  'StreetAddress2',
  'StreetAddress3',
  'City',
  'State',
  'StateCode',
  'PostalCode',
  'Country',
  'CountryCode',
];

const FEE_ATTRIBUTES = [
  'FeeID',
  'FeeName',
  'FeeAmount',
  'ProductID',
  'ProductName',
  'Active',
];

const PRODUCT_ATTRIBUTES = [
  'ProductId',
  'ProductName',
  'ProductCode',
  'ProductType',
  'ProductDescription',
  'StartTime',
  'EndTime',
  'Status',
  'Capacity',
  'IsIncluded',
];

const SPEAKER_ATTRIBUTES = [
  'Id',
  'FirstName',
  'LastName',
  'EmailAddress',
  'Prefix',
  'Designation',
  'Company',
  'Title',
  'SpeakerCode',
  'FacebookURL',
  'LinkedInURL',
  'TwitterURL',
  'ProfileImageURL',
  'Biography',
  'InternalNote',
];

const EVENT_TYPE = 'CventContent';

module.exports = {
  DATE_RANGES,
  EVENT_ATTRIBUTES,
  EVENT_TYPE,
  FEE_ATTRIBUTES,
  PRODUCT_ATTRIBUTES,
  SPEAKER_ATTRIBUTES,
};
