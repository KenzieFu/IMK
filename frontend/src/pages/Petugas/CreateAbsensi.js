import React from 'react'
import { FormAbsensi } from '../../components/Absensi/FormAbsensi'
import { defer, json, useLoaderData } from 'react-router-dom'
import { Suspense } from 'react'
import { Await } from 'react-router-dom'

export const CreateAbsensi = () => {
    const {students}=useLoaderData('create-absensi');
  return (
    <>
        <Suspense>
            <Await resolve={students}>
            {loadedData=><FormAbsensi method={"POST"} students={loadedData}/>}
            </Await>
        </Suspense>
        
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


  /* export async function action({ params, request }) {
    console.log("joejfpow")
    const method = request.method;
    const data = await request.formData();
    const myData=JSON.parse(data.get("data"));
    const time=new Date().toTimeString()
    console.log(myData.nisn);
    const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/absensi-keluar/'+myData.nisn, {
      method: method,
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer"
      },
      body:JSON.stringify({
        waktu_keluar:time
      })
    });
  
    if (!response.ok) {
      throw json(
        { message: 'Could not update attendance.' },
        {
          status: 500,
        }
      );
    
    }
     return  redirect("/petugas/scan-keluar");
  }
   */


