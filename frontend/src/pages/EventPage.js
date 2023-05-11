import React, { Suspense, useState } from 'react'
import { EventSection } from '../components/EventSection'
import { EventCalender } from '../components/EventCalender'
import { Sidebar } from '../UI/Sidebar'
import classes from "./EventPage.module.css"
import { Await, defer, json, useRouteLoaderData } from 'react-router-dom'
export const EventPage = () => {
  const {events}=useRouteLoaderData("event-calender")
  const [clickedEvent,setClickedEvent]=useState([]);
  const [currentDate,setCurrentDate]=useState([]);
  const pickDateHandler=(events)=>{
    setClickedEvent(events)
  }

  const pickCurrentDate=(date)=>{
    setCurrentDate(date);
  }
  return (
    <>
    <div className={classes.content}>
        <Sidebar/>
        <div style={{ width:"90%" }}>
            <EventSection currentDate={currentDate} selectedDate={clickedEvent}/>
            <Suspense>
                <Await resolve={events}>
               {loadedData=><EventCalender events={loadedData} pickCurrentDate={pickCurrentDate} pickDateHandler={pickDateHandler}/>} 
                </Await>

            </Suspense>
           
        </div>
        
    </div>
       
    </>
  )
}


const loadEvents=async ()=>{
 
  const response = await fetch(" http://localhost:8080/admin-perpustakaan-methodist-cw/event")
  console.log(response);
  if(!response.ok)
  {
    throw json(
      { message: 'Could not fetch books.' },
      {
        status: 500,
      }
    );
  }
  else{
    const resData=await response.json();
  
    return resData.data;
  }
} 

export const loader=()=>{
  return defer ({
    events:loadEvents()
  })
}

