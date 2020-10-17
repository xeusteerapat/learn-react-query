import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Planet from './Planet';

const fetchPlanets = async () => {
  const response = await axios.get('https://swapi.dev/api/planets');
  const result = response.data;
  return result;
};

const Planets = () => {
  const { data, status } = useQuery('planets', fetchPlanets, {
    retry: 2,
    staleTime: 0,
    // cacheTime: 10,
    onSuccess: () => console.log('data fetching successfully!'),
  });

  return (
    <div>
      <h2>Planets</h2>
      {status === 'loading' && <div>Loading</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.results.map(planet => (
            <Planet planet={planet} key={planet.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Planets;
