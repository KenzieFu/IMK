import React, { useState } from 'react'
import {ScanQrBox} from "../../components/QRcode/ScanQrBox";
import { NavLink, json, redirect, useActionData } from 'react-router-dom';
import { InfoAbsensiModal } from '../../components/admin/modals/InfoAbsesiModal';
import { ErrorModal } from '../../components/modals/ErrorModal';
import classes from './ScanPage.module.css'

export const ScanPage = () => {
  const [showInfo,setShowInfo]=useState(false);
  const data=useActionData();
  const showHandler=()=>{
    setShowInfo(prev=>!prev);
  }

  return (
   <>
    <NavLink to="/petugas">Home</NavLink>
    <ScanQrBox className={classes['scanqr']} showInfo={showInfo} showHandler={showHandler}/>

    {showInfo && <ErrorModal message={data}  onClose={showHandler}/>}
   </>
  )
}


export async function action({ params, request }) {
  
  const method = request.method;
  const data = await request.formData();
  const myData=JSON.parse(data.get("data"));
  const currentDate=new Date().toDateString();
  const time=new Date().toTimeString()
  console.log(currentDate);
  console.log(time);
  console.log(myData.nisn);
  const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/absensi', {
    method: method,
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer"
    },
    body:JSON.stringify({
      nisn:myData.nisn,
      tanggal:currentDate,
      waktu_masuk:time,
    })
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not create attendance.' },
      {
        status: 500,
      }
    );
  
  }
   return  response
}

