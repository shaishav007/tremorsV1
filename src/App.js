
import './App.css';
import FrontPage from './components/FrontPage';
import About from './components/About';
import { Routes, Route } from 'react-router-dom';
import MapPage from './components/MapPage';
import ErrorPage from './components/ErrorPage';


function App() {


  
  return (
    
    <div className="App">

      <Routes>
            <Route path="/" element={ <FrontPage /> } />
            <Route path='/about' element={ <About /> } />
            <Route path='/mapPage' element={ <MapPage /> } />
            <Route path="*" element={ <ErrorPage /> } />             
      </Routes>
    </div>

  );
}

export default App;

//since we have 1000s in a day, we will see if limiting a region gives us something manageable
