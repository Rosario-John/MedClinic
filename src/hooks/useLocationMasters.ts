import { useState, useEffect } from 'react';
import { countries, states, cities } from '../data/locationMasters';

export const useLocationMasters = (selectedCountry?: string, selectedState?: string) => {
  const [availableStates, setAvailableStates] = useState(states);
  const [availableCities, setAvailableCities] = useState(cities);

  useEffect(() => {
    if (selectedCountry) {
      setAvailableStates(states.filter(state => state.countryId === selectedCountry));
      setAvailableCities([]);
    } else {
      setAvailableStates([]);
      setAvailableCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      setAvailableCities(cities.filter(city => city.stateId === selectedState));
    } else {
      setAvailableCities([]);
    }
  }, [selectedState]);

  return {
    countries,
    states: availableStates,
    cities: availableCities,
  };
};