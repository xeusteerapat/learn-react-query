import React, { useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import Navbar from './components/Navbar';
import People from './components/People';
import Planets from './components/Planets';

const App = () => {
  const [page, setPage] = useState('planets');

  return (
    <>
      <div className='App'>
        <h1>Star War Info</h1>
        <Navbar setPage={setPage} />
        <div className='content'>
          {page === 'planets' ? <Planets /> : <People />}
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen />
    </>
  );
};

export default App;
