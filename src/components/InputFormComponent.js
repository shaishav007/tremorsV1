import React from 'react'
import axios from 'axios';
import { useState,useRef } from 'react';
import './styles/InputFormComponent.css';

const InputFormComponent = (props) => {

    //new states
    const[latitude,setLatitude]= useState(23.5);
    const[longitude,setLongitude]= useState(0);
    const [ error, setError ] = useState(null);

    //lets add the states
    const [minState,setMinState]=useState(0);
    const [startDateState,setStartDate] = useState("2021-11-03");
    const [endDateState,setEndDate]= useState("2022-11-03")
    

    const placeRef = useRef('');

    const[last24hours,setlast24Hours]= useState(false)
//define the getPlaceQuery function
const getPlaceQuery=(e)=>{
    e.preventDefault();
    //run the api call here and get something.
    //don't start search until the search bar has atleast 4 letters in it
    if(placeRef.current.value.length>3){
        axios({
            url:'https://api.geocodify.com/v2/geocode',
            params:{
            api_key:'d932e384a601c13eefe2d9926ebe5c44b867c22b',
            q:placeRef.current.value
            }
        }).then((res)=>{
            //save the coordinates in this exact order otherwise it won't work
            if(res.data.response.features[0] === undefined){
                throw Error(`Please check spelling`)
            }else{
            const coords = res.data.response.features[0].geometry.coordinates;
            //set the latitude and longitude here
            setLatitude(latitude);
            setLongitude(longitude);
            //querying the earthquake API now
            axios({
                url:'https://earthquake.usgs.gov/fdsnws/event/1/query',
                params:{
                    format:'geojson',
                    latitude:coords[1],
                    longitude:coords[0],
                    maxradiuskm:50,
                    starttime:startDateState,
                    endtime:endDateState,
                    minmagnitude:minState,
                }
            }).then((earthquakeResponse)=>{
                if(earthquakeResponse.data.metadata.count===0){
                    props.coordsAndMarkerData(latitude,longitude,[])
                    throw Error(`no earthquakes for ${placeRef.current.value}`);
                }else{
                    //IF YOU ARE GOING TO CHANGE STATES AND PASS DATA, PASS DATA FIRST, DON"T DEPEND ON STATES TO PASS THAT DATA. RESERVE STATE CHANGE ONLY FOR RENDERS NOTHING ELSE
                    props.coordsAndMarkerData(latitude,longitude,earthquakeResponse.data);
                }
            }).catch((error)=>{
                setError(error.message);
            })
        }
        }).catch((err)=>{
            setError(err.message)
            console.log(error);
            
        })
    }
}

const getRangeQuery=(e)=>{
    setMinState(e.target.value)
 
}

const getDateQuery=(e)=>{
    if(e.target.name==='startDate'){
        setStartDate(e.target.value);
    }else if(e.target.name==='endDate'){
        setEndDate(e.target.value);
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
}

//after all these we need to just add stuff to the array so that we can pass the values to the parent
    const handleLast24Hours=(e)=>{
        //if this is true, then just make the query here and send the data for map based on this query

        setlast24Hours(!setlast24Hours);
        if (e.target.checked===false){
            props.coordsAndMarkerData(latitude,longitude,[]);
        }else{
            const presentDateObject = new Date()
            const presentDate = `${presentDateObject.getFullYear()}-${presentDateObject.getMonth()+1}-${presentDateObject.getDate()}`;
            
            const yesterday = `${presentDateObject.getFullYear()}-${presentDateObject.getMonth()+1}-${presentDateObject.getDate()-1}`;
           
            axios({
                url:'https://earthquake.usgs.gov/fdsnws/event/1/query',
                params:{
                    format:'geojson',
                    starttime:yesterday,
                    endtime:presentDate,
                }
            }).then((res)=>{
                //this data means that the original map is here, we can send it to the marker info thing from here              
                props.coordsAndMarkerData(latitude,longitude,res.data);
    
            }).catch((err)=>{
                console.log(err);
            })
        }
    }

  return (
    <div className='formContainer'>
        <div className='queryContainer lastTwentyFour'>
                <label className='queryLabel checkboxContainer' htmlFor='lastTwentyFour'>Last 24 hours? 
                    <input type="checkbox" name='lastTwentyFour' onChange={handleLast24Hours}/>
                    <span className="checkmark"></span>
                </label>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="queryContainer">
                <label htmlFor='place' className='queryLabel placeQuery'>Enter the location:</label>
                <input type="text" name='place' onChange={getPlaceQuery} ref={placeRef} disabled={last24hours} className='placeInput'/>
            </div>
            <div className="queryContainer">
                <label htmlFor='minValue' className='queryLabel magLabel'>Min Magnitude: {minState}</label>
                <input type="range" name='minValue' min="0" max="10" step="0.25" onChange={getRangeQuery} disabled={last24hours} value={minState} className='magSlider'/>
            </div>
            <div className='dateContainer'>
                <div className="queryContainer">
                    <label htmlFor='startDate' className='queryLabel dateLabel'>Start Date </label>
                    <input type="date" name='startDate' onChange={getDateQuery} disabled={last24hours} value={startDateState} className='dateInput'/>
                </div>
                <div className="queryContainer">
                    <label htmlFor='endDate' className='queryLabel dateLabel'>End Date </label>
                    <input type="date" name='endDate' onChange={getDateQuery} disabled={last24hours} value={endDateState} className='dateInput'/>
                </div>
            </div>
        </form>
            {/* { error && <div><p className="errorMessage formError">{ error }</p></div> } */}
            
    </div>
  )
}

export default InputFormComponent