import React, { useState } from 'react'
import {ScanQrBox} from "../../components/QRcode/ScanQrBox";
import { json, redirect, useActionData } from 'react-router-dom';

import { ErrorModal } from '../../components/modals/ErrorModal';
import { ScanQrSiswa } from '../../components/QRcode/ScanQrSiswa';


export const ScanSiswa = () => {
  const [showInfo,setShowInfo]=useState(false);
  const data=useActionData();
  const showHandler=()=>{
    setShowInfo(prev=>!prev);
  }

  return (
   <>
    <ScanQrSiswa  showInfo={showInfo} showHandler={showHandler}/>
    {showInfo && <ErrorModal message={data}  onClose={showHandler}/>}

   </>
  )
}



export async function action({ params, request }) {
   try{
    const data=await request.formData();
    console.log(data.get("data"));
    const myData=JSON.parse(data.get("data"))?JSON.parse(data.get("data")):null;
    console.log(myData.id_siswa)
    console.log("halooo")
    const response=await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/siswa/"+myData.id_siswa);

    if(response.status === 501)
    {
       
        return response;
    }
       
    
    return redirect("/petugas/siswa/"+myData.id_siswa);

   }catch(e)
   {
    return json({
        message:"Siswa Tidak Ditemukan"
    })
   }
    
    
  }
  
  

