import axios from 'axios';

import React, { useState } from 'react'

import InputFormComponent from './InputFormComponent'
import DisplayMap from './DisplayMap';
import HeroStats from './HeroStats';
//this is importing from the npm install firebase thing
import {getDatabase, ref, set} from 'firebase/database';
//this one is importing our specific firebase settings
import Firebase from './Firebase';


const MapPage = () => {

    //new states during refactor
    const [latitude,setLatitude] = useState(23.5);
    const [longitude,setLongitude] = useState(90);

    const [displayMapNow,setDisplayMapNow] = useState(false);

    //state to get data from the input form // an object which is just place, magnitude, ....
    const [markerData,setMarkerData]=useState([]);

    //set it on app load
    const[heroInfo,setHeroInfo]= useState({})
    const[isHeroObjectReady,SetIsHeroObjectReady]=useState(false);


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

    //this runs at the start. It gets all the data from the date we started this app to present date and writes it to firebase
    const loadStuffInFirebase=()=>{
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

    //this one is where the result of the query gets in and we get to decide what gets displayed on the map
    const setDataToDisplay=(lat,long,resultData)=>{
        //this function only sets the right data in the right place
        console.log('this goes into feed,state should change',resultData)
        loadStuffInFirebase();
        setLatitude(lat);
        setLongitude(long);
        generateMarkerInfo(resultData);
        console.log('about to display map right now')
        setDisplayMapNow(true);
    }


    //we will need to pass on the data to this function at some point -THIS ONE
    const generateMarkerInfo=(feed)=>{
        let markerInfo = [];
        //booleans and arrays refuse to work with each other in js. DO NOT EVER USE BOOLEANS WITH ARRAYS AGAIN
        if(feed.length!==0){
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
        }
        //update the state now to have marker data

        setMarkerData(markerInfo);
    }


  return (
    <div className='mapPage'>
        <InputFormComponent coordsAndMarkerData={setDataToDisplay}/>
        {/* if user has chosen then just put the fucking map on the table */}   {
        displayMapNow?
        <DisplayMap latitude={latitude} longitude={longitude} markerPopupInfo={markerData}/>
       
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