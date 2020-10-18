import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Planet from './Planet';

const fetchPlanets = async (key, page) => {
  const response = await axios.get(
    `https://swapi.dev/api/planets/?page=${page}`
  );
  const result = response.data;
  return result;
};

const Planets = () => {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(['planets', page], fetchPlanets, {
    retry: 2,
    staleTime: 0,
    // cacheTime: 10,
    onSuccess: () => console.log('data fetching successfully!'),
  });

  return (
    <div>
      <h2>Planets</h2>
      <button onClick={() => setPage(1)}>Page 1</button>
      <button onClick={() => setPage(2)}>Page 2</button>
      <button onClick={() => setPage(3)}>Page 3</button>
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
