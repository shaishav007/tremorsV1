import axios from 'axios';

import React, { useEffect, useState } from 'react'

import InputFormComponent from './InputFormComponent'
import DisplayMap from './DisplayMap';
import MyComponent from  './DisplayMap'
import HeroStats from './HeroStats';
//this is importing from the npm install firebase thing
import {get, getDatabase, push, ref, set} from 'firebase/database'

//this one is importing our specific firebase settings
import Firebase from './Firebase';


const MapPage = () => {
//state to get data from the input form // an object which is just place, magnitude, ....
const [userChoices,setUserChoices] = useState({});
const [hasUserChosen,setHasUserChosen]=useState(false);
const [markerData,setMarkerData]=useState([]);

const[isDataBaseReady,setIsDatabaseReady]= useState(false);

//set it on app load
const[heroInfo,setHeroInfo]= useState({})
const[isHeroObjectReady,SetIsHeroObjectReady]=useState(false);
//current entries in the database
const[currentDatabaseEntry,setCurrentDatabaseEntry]=useState({});

//just another function to reformat data to be passed on to map components

const writeToFirebase=(feed)=>{
    feed.features.forEach((item)=>{
        //for each entry in the earthquakes
        let responder = 'geology teachers';
        //if event magnitude is greater than 3.5 item.properties.mag
        if(item.properties.mag>=3.5){
            responder='Rich Mortal';
            
        }else if(item.properties.mag>6){
            responder='Strong Good';
        }else if(item.properties.mag>7){
            responder='all';
        }

        //update the current entry
        updateCurrentEntry(item,responder);
    });

    //now that it has the updated entry call firebase and set stuff straight
    const database = getDatabase(Firebase);
    const dbRef= ref(database);
    //replaces whatever in the data right now with the currentEntry
    set(dbRef,currentEntry);

    //after we wrote stuff to firebase, now lets set Hero info
    setHeroInfo(currentEntry);
    SetIsHeroObjectReady(true);
}

//lets say the current entry in the database is
let currentEntry={
    
    'Rich Mortal':{
        incidents:[{
          eventId:'abcd',
          mag:5.5 ,
          description:'italy' 
        }],
        resolved:1,
        vacation:0,
    },
    'Strong Good':{
        incidents:[{
            eventId:'abcd',
            mag:5.5 ,
            description:'italy' 
          }],
          resolved:1,
          vacation:0,
    },
    'geology teachers':{
        incidents:[{
            eventId:'abcd',
            mag:5.5 ,
            description:'italy' 
          }],
          resolved:1,
          vacation:0,
    }
}

const updateCurrentEntry= (incident,responder)=>{
    let presentData= currentEntry[`${responder}`];
    let currentIncidents = [...presentData.incidents];
    let resolved=presentData.resolved;
    let vacation = presentData.vacation;

    currentIncidents.push({
        eventId:incident.id,
        mag:incident.properties.mag,
        description:incident.properties.place
    })
    resolved+=1;
    vacation=Math.floor(resolved/10);

    //we calculated the new values now just putting it in the global variable
    currentEntry[`${responder}`]={
        incidents:currentIncidents,
        resolved:resolved,
        vacation:vacation
    }
    // console.log(currentIncidents,resolved,vacation,responder);


}

const generateMarkerInfo=(feed)=>{
    

    let markerInfo = [];
    feed.features.forEach((item)=>{
        //for each incident just add the incident in the appropriate place in the database?
        //the way to make a reference would be based on magnitude?
        let responder = 'geology teachers';
        //if event magnitude is greater than 3.5 item.properties.mag
        if(item.properties.mag>=3.5){
            responder='Rich Mortal';
            
        }else if(item.properties.mag>6){
            responder='Strong Good';
        }else if(item.properties.mag>7){
            responder='all';
        }

        //we are adding 1 marker for each incident
        markerInfo.push({
            coords:item.geometry.coordinates,
            popupInfo:{
                    place:item.properties.place,
                    magnitude:item.properties.mag,
                    responder:responder
                }
        })
    });
    //update the state now to have marker data
    setMarkerData(markerInfo);
}

useEffect(()=>{
    //since we need to see the last 24 hours data, we will have to make sure that userChoices is checked for that

    //lets see what we have in the database
    const database = getDatabase(Firebase);
    const dbRef = ref(database);
    get(dbRef).then((snapshot)=>{
        if(snapshot===null){
            //if there is no values inside
            console.log('Nothing is inside');
        }else{
            //update currentDatabaseEntry
            console.log('snapshot',snapshot.val())
            setCurrentDatabaseEntry(snapshot.val());
        }

    }).catch((err)=>{
        //if any error then log it
        console.log(err);
    })    
 

    if(userChoices.last24Hours===true){
        axios({
            url:'https://earthquake.usgs.gov/fdsnws/event/1/query',
            params:{
                format:'geojson',
                starttime:'2022-11-03',
                endtime:'2022-11-04'
            }
        }).then((res)=>{
            //now that we have all the data from the last 24 hours, we can finally plot them in the marker.
            console.log(res.data);
            //now lets make a data structure for markers and put good data into them
            generateMarkerInfo(res.data);
         
            //since this is where get user data, we will also call firebase at some place around here, ONLY after we get data
            setHasUserChosen(true);
        }).catch((err)=>{
            console.log(err);
        });
        
    }
    else if(userChoices.min!==undefined){
        //make the final api call here so that we can get the stuff ready also refresh the map logic 
       setHasUserChosen(true);
       //so we have tested the map, lets run our original api

       axios({
           url:'https://earthquake.usgs.gov/fdsnws/event/1/query',
           params:{
               format:'geojson',
               latitude:userChoices.latitude,
               longitude:userChoices.longitude,
               maxradiuskm:50,
               starttime:userChoices.startDate,
               endtime:userChoices.endDate,
               minmagnitude:userChoices.min,
               maxmagnitude:userChoices.max
           }
   
       }).then((res)=>{
           console.log(res.data);
       }).catch((err)=>{
           console.log(err);
       });
    }

},[userChoices]);

useEffect(()=>{
    //get the present data so that we can get the present data
    const presentDateObject = new Date()
    const presentDate = `${presentDateObject.getFullYear()}-${presentDateObject.getMonth()+1}-${presentDateObject.getDate()}`;
    console.log(presentDate);
    axios({
        url:'https://earthquake.usgs.gov/fdsnws/event/1/query',
        params:{
            format:'geojson',
            starttime:'2022-11-03',
            endtime:presentDate,
        }
    }).then((res)=>{
        console.log(res.data);
        //write this to firebase
        writeToFirebase(res.data);

    }).catch((err)=>{
        console.log(err);
    })
},[])

  return (
    <div>
        <InputFormComponent getFinalQuery= {setUserChoices}/>
{/* if user has chosen then just put the fucking map on the table */}   {
        hasUserChosen?
        <DisplayMap latitude={userChoices.latitude} longitude={userChoices.longitude} markerPopupInfo={markerData}/>
       
        :<>Try filling the form up</>
        }
        {
        (!isHeroObjectReady)?
            <></>
            :<HeroStats heroData={heroInfo}/>
            
            
        }
    </div>
  )
}

export default MapPage