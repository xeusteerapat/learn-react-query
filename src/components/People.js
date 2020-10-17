import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Person from './Person';

const fetchPeople = async () => {
  const config = {
    method: 'get',
    url: 'https://swapi.dev/api/people/',
    headers: {},
  };

  const response = await axios(config);
  const result = response.data;
  return result;
};

const People = () => {
  const { data, status } = useQuery('people', fetchPeople);

  return (
    <div>
      <h2>People</h2>
      {status === 'loading' && <div>Loading</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <div>
          {data.results.map(person => (
            <Person person={person} key={person.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default People;
