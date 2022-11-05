import axios from 'axios';

import React, { useEffect, useState } from 'react'

import InputFormComponent from './InputFormComponent'
import DisplayMap from './DisplayMap';
import MyComponent from  './DisplayMap'

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
//just another function to reformat data to be passed on to map components

const checkIfDatabaseReady=()=>{

    const database = getDatabase(Firebase);
    // //this is just the location where you want to push the data
    //if there is no responder entry in the database, add the fucking entry
    const dbRef = ref(database);
    const supes = ['geology teachers','Rich Mortal','Strong Good'];

    supes.forEach((supe)=>{
        get(dbRef,supe).then((snapshot)=>{
            if(snapshot.val()===null){
                console.log(supe,'not found creating entry')
                const entry={
                            incidents:[],
                          vacations:0,
                          resolved:0,
                          pictureUrl:'https://mir-s3-cdn-cf.behance.net/project_modules/1400/38004d25315373.56343ce0a4ad1.jpg'
                        }
                set(ref(database,supe),entry);
                  
            }else{
                // console.log(supe,'found');
            }
        })
    })
    setIsDatabaseReady(true);
}

const addEntryToDatabase=(incident,responder)=>{
    if(!isDataBaseReady){
        checkIfDatabaseReady();
    }

        console.log(incident.properties.mag,responder,incident.id);
        //whenever we have an entry we just need to put the right things in the right place
    let currentDataOfResponder={}
        //get the right data
        const database = getDatabase(Firebase);
        const dbRef = ref(database,responder);
        get(dbRef,responder).then((snapshot)=>{
            if(snapshot.val()===null){
                console.log('no entry found for',responder)
            }
            //snapshot.val() contains our data
            const dataObject = snapshot.val();
            currentDataOfResponder.incidents=dataObject.incidents;
            currentDataOfResponder.resolved=dataObject.resolved;
            currentDataOfResponder.vacations=dataObject.vacations;
            console.log('current data for',responder,currentDataOfResponder);
        });
    
}

const generateMarkerInfo=(feed)=>{
    //there is definitely going to be a firebase CALL in this chunk

    
    // //push some data at the ref
    // push(dbRef,"This should work.");
    /*sample data structure - general geology teachers, Rich mortal(3.5-6), Strong good
    //Rich Mortal:{
            incidents:[
                  {eventid:usnic1000,
                  description: description of the event,
                   magnitude:3.5 -6},
                  {eventid:usnic1000,
                  description: description of the event},
                  {eventid:usnic1000,
                  description: description of the event}
                ],
            vacations,
            resolved:,
            pictureUrl:
    // }
                what all do we need to extract?
                to display on the app. magnitude somehow?


    */


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
        addEntryToDatabase(item,responder);
        
        //we are adding 1 marker for each incident
        markerInfo.push({
            coords:item.geometry.coordinates,
            popupInfo:{
                    place:item.properties.place,
                    magnitude:item.properties.mag,
                }
        })
    });
    //update the state now to have marker data
    setMarkerData(markerInfo);
}

useEffect(()=>{
    //since we need to see the last 24 hours data, we will have to make sure that userChoices is checked for that

 

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

  return (
    <div>
        <InputFormComponent getFinalQuery= {setUserChoices}/>
{/* if user has chosen then just put the fucking map on the table */}   {
        hasUserChosen?
        <DisplayMap latitude={userChoices.latitude} longitude={userChoices.longitude} markerPopupInfo={markerData}/>
       
        :<>Try filling the form up</>
        }
    </div>
  )
}

export default MapPage