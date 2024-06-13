'use client'
import React from 'react';
import Login from './login/page';

const Home = () => {
  return (
    <main className='flex h-screen w-full flex-grow flex-col'>
      <Login/>
    </main>
  );
}
export default Home;