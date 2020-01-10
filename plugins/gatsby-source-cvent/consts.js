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

const EVENT_TYPE = 'CventContent';

module.exports = {
  DATE_RANGES,
  EVENT_ATTRIBUTES,
  EVENT_TYPE,
  FEE_ATTRIBUTES,
  PRODUCT_ATTRIBUTES,
};
