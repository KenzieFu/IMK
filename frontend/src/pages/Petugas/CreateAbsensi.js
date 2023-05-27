import React, { useEffect, useState } from 'react'
import { FormAbsensi } from '../../components/Absensi/FormAbsensi'
import { NavLink ,defer, json, redirect, useActionData, useLoaderData } from 'react-router-dom'
import { Suspense } from 'react'
import { Await } from 'react-router-dom'
import { ErrorModal } from '../../components/modals/ErrorModal'
import classes from '../Admin/adminbatch.module.css'

export const CreateAbsensi = () => {
    const {students}=useLoaderData('create-absensi');
    const[error,setError]=useState(false);

    const showHandler=()=>{
      setError(prev=>!prev);
    }

    const data=useActionData();

    useEffect(()=>{
      
      showHandler()
       
    },[data])
  return (
    <>
      <NavLink to="/petugas">Home</NavLink>
        <Suspense>
            <Await resolve={students}>
            {loadedData=><FormAbsensi method={"POST"} students={loadedData}/>}
            </Await>
        </Suspense>
        {data && data.message && !error && <ErrorModal message={data} onClose={showHandler}/>}
      
        
    </>
  )
}



const loadStudents=async ()=>{
    const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/siswa")
    console.log(response);
    if(!response.ok)
    {
      throw json(
        { message: 'Could not fetch student.' },
        {
          status: 500,
        }
      );
    }
    else{
      const resData=await response.json();
      return resData;
    }
  }

  export const loader=()=>{
    return defer({
      students:loadStudents()
    })
  }


  export async function action({ params, request }) {
  
    const method = request.method;
    const data = await request.formData();
    const currentDate=new Date().toDateString();
    const time=new Date().toTimeString()
    const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/absensi', {
      method: method,
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer"
      },
      body:JSON.stringify({
        nisn:data.get("nisn"),
        tanggal:currentDate,
        waktu_masuk:time,
      })
    });
    console.log(response.message)
    if(response.status === 400 || response.status === 401)
    {
       return response
    }
    if (!response.ok) {
      throw json(
        { message: 'Could not create attendance.' },
        {
          status: 500,
        }
      );
    
        
    
    }

    return response
     
  }


