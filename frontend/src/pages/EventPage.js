import React, { Suspense, useState } from 'react'
import { EventSection } from '../components/EventSection'
import { EventCalender } from '../components/EventCalender'
import { Sidebar } from '../UI/Sidebar'
import classes from "./EventPage.module.css"
import { Await, defer, json, redirect, useRouteLoaderData } from 'react-router-dom'
export const EventPage = () => {
  const {events}=useRouteLoaderData("event-calender")
  const [clickedEvent,setClickedEvent]=useState([]);
  const [currentDate,setCurrentDate]=useState([]);
  const [currentIndex,setCurrentIndex]=useState(0);
  
  const pickDateHandler=(events)=>{
    setClickedEvent(events)
  }

  const reset=()=>{
    setCurrentIndex(0);
  }

  const onPageHandler=(index)=>{
    setCurrentIndex(index-1)
  }
 

  const pickCurrentDate=(date)=>{

    setCurrentDate(date);
  }
  return (
    <>
    <div className={classes.content}>
        <Sidebar/>
        <Suspense>
        <div style={{ width:"90%" }}>
            <EventSection onPageHandler={onPageHandler} updateListHandler={pickDateHandler} currentDate={currentDate} currentIndex={currentIndex}  selectedDate={clickedEvent} />
         
                <Await resolve={events}>
               {loadedData=><EventCalender reset={reset} events={loadedData} pickCurrentDate={pickCurrentDate} pickDateHandler={pickDateHandler}/>} 
                </Await>

           
           
        </div>
        </Suspense>
        
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
      { message: 'Could not fetch events.' },
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


export async function action({ params, request }) {
  
  const method = request.method;
  console.log(method);

  const data = await request.formData();
  const type=data.get("type");
  const event={
    title_event:data.get("title_event"),
    content_event:data.get("content_event"),
    tanggal_event:data.get("tanggal_event"),
    id_akun:data.get("id_akun"),
    status:"Privat",
    tipe:"Siswa"
  }


const selectedEvent=event
  
  let url="";
  let errorMessage="";
  if(type==="create"){url="http://localhost:8080/perpustakaan-methodist-cw/event";errorMessage="Event gagal dibuat.";console.log("Create")}
  else if(method === "DELETE"){url="http://localhost:8080/admin-perpustakaan-methodist-cw/event/"+data.get("id_event");
  errorMessage="Event Gagal Terhapus.";console.log("Delete")}
  else if(method === "PUT"){url="http://localhost:8080/perpustakaan-methodist-cw/event/"+data.get("id_event");
  errorMessage="Event Gagal Teredit.";console.log("Update");}
  console.log("My Data")
  console.log(data);
  console.log(selectedEvent)
  const response = await fetch(url, {
    method: method,
    headers:{
      'Content-Type': 'application/json',
      "Authorization":"Bearer"
    },
    body:JSON.stringify(event)
  });

  if (!response.ok) {
    throw json(
      { message: errorMessage },
      {
        status: 500,
      }
    );
  
  }
   return  redirect("/calender");
}


