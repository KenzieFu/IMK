import React, { useState } from 'react'
import { EventSection } from '../components/EventSection'
import { EventCalender } from '../components/EventCalender'
import { Sidebar } from '../UI/Sidebar'
import classes from "./EventPage.module.css"
export const EventPage = () => {
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
            <EventCalender pickCurrentDate={pickCurrentDate} pickDateHandler={pickDateHandler}/>
        </div>
        
    </div>
       
    </>
  )
}


/* const loadBooks=async ()=>{
 
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/buku-perpus")
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
    return resData;
  }
} */


/* http://localhost:8080/admin-perpustakaan-methodist-cw/event */