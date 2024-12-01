// Initial master data for locations
export const countries = [
  { id: '1', code: 'US', name: 'United States' },
  { id: '2', code: 'UK', name: 'United Kingdom' },
  { id: '3', code: 'CA', name: 'Canada' },
  // Add more countries
];

export const states = [
  // United States
  { id: '1', countryId: '1', code: 'NY', name: 'New York' },
  { id: '2', countryId: '1', code: 'CA', name: 'California' },
  { id: '3', countryId: '1', code: 'TX', name: 'Texas' },
  
  // United Kingdom
  { id: '4', countryId: '2', code: 'ENG', name: 'England' },
  { id: '5', countryId: '2', code: 'SCT', name: 'Scotland' },
  { id: '6', countryId: '2', code: 'WLS', name: 'Wales' },
  
  // Canada
  { id: '7', countryId: '3', code: 'ON', name: 'Ontario' },
  { id: '8', countryId: '3', code: 'BC', name: 'British Columbia' },
  { id: '9', countryId: '3', code: 'QC', name: 'Quebec' },
  // Add more states
];

export const cities = [
  // New York
  { id: '1', stateId: '1', code: 'NYC', name: 'New York City' },
  { id: '2', stateId: '1', code: 'BUF', name: 'Buffalo' },
  
  // California
  { id: '3', stateId: '2', code: 'LA', name: 'Los Angeles' },
  { id: '4', stateId: '2', code: 'SF', name: 'San Francisco' },
  
  // Texas
  { id: '5', stateId: '3', code: 'HOU', name: 'Houston' },
  { id: '6', stateId: '3', code: 'DAL', name: 'Dallas' },
  
  // England
  { id: '7', stateId: '4', code: 'LON', name: 'London' },
  { id: '8', stateId: '4', code: 'MAN', name: 'Manchester' },
  
  // Add more cities
];