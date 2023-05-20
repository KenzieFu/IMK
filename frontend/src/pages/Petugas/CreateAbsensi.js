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
            {loadedData=><FormAbsensi students={loadedData}/>}
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


