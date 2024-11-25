import { useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar';
import Footer from './components/footer';

function App() {
  return (
    <>
      <div className='container'>
        <Sidebar/>
        <main>
          <p>Main</p>
        </main>
      </div>
      <Footer/>
    </>
  )
}

export default App;
