
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
//testing apis starts now.
useEffect(()=>{

  axios({
    url:'https://earthquake.usgs.gov/fdsnws/event/1/query',
    params:{
      format:'geojson',
      starttime:'2022-10-03',
      endtime:'2022-11-03',
      orderby:'magnitude',
      latitude:43.651070, 
      longitude:-79.347015,
      maxradiuskm:1000,
    }
  }).then((res)=>{
    console.log(res.data);

  }).catch((err)=>{
    console.log(err);
  })
},[]);

  return (
    <div className="App">
      
    </div>
  );
}

export default App;

//since we have 1000s in a day, we will see if limiting a region gives us something manageable
