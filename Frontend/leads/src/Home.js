import React from 'react';
import Header from './components/layout/Header';
import Dashboard from './components/leads/Dashboard';

const Home = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <Dashboard />
      </div>
    </>
  );
};

export default Home;
