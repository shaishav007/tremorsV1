
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import FrontPage from './components/FrontPage';
import About from './components/About';
import { Routes, Route } from 'react-router-dom';
import MapPage from './components/MapPage';

function App() {


  
  return (
    
    <div className="App">

      <Routes>
            <Route path="/" element={ <FrontPage /> } />
            <Route path='/about' element={ <About /> } />
            <Route path='/mapPage' element={ <MapPage /> } />
            
      </Routes>
    </div>

  );
}

export default App;

//since we have 1000s in a day, we will see if limiting a region gives us something manageable
