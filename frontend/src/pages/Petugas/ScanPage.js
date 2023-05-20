import React, { useState } from 'react'
import {ScanQrBox} from "../../components/QRcode/ScanQrBox";
import { json, redirect } from 'react-router-dom';
import { InfoAbsensiModal } from '../../components/admin/modals/InfoAbsesiModal';
export const ScanPage = () => {
  const [showInfo,setShowInfo]=useState(false);
  const showHandler=()=>{
    setShowInfo(prev=>!prev);
  }

  return (
   <>
    <ScanQrBox showInfo={showInfo} showHandler={showHandler}/>
    {showInfo && <InfoAbsensiModal onClose={showHandler}/>}
   </>
  )
}


export async function action({ params, request }) {
  
  const method = request.method;
  const data = await request.formData();
  const myData=JSON.parse(data.get("data"));
  console.log(myData.nisn);
  const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/absensi', {
    method: method,
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer"
    },
    body:JSON.stringify({
      nisn:myData.nisn
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
   return  redirect("/petugas/scan");
}

