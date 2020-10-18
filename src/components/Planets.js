import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
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
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['planets', page],
    fetchPlanets,
    {
      retry: 2,
      staleTime: 0,
      // cacheTime: 10,
      onSuccess: () => console.log('data fetching successfully!'),
    }
  );

  return (
    <div>
      <h2>Planets</h2>
      {status === 'loading' && <div>Loading</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <>
          <button
            onClick={() => setPage(prevVal => Math.max(prevVal - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage(prevVal =>
                !latestData || !latestData.next ? prevVal : prevVal + 1
              )
            }
            disabled={!latestData || !latestData.next}
          >
            Next Page
          </button>
          <div>
            {resolvedData.results.map(planet => (
              <Planet planet={planet} key={planet.name} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
