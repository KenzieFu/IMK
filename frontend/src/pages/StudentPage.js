import React, { useState } from 'react'
import classes from "./StudentPage.module.css";
import { Sidebar } from '../UI/Sidebar';
import { StudentChart } from '../components/StudentChart';
import { StudentCard } from '../components/StudentCard';
import { LatestBook } from '../components/LatestBook';
import { PeminjamanBuku } from './PeminjamanBuku';
import { useSelector } from 'react-redux';
import { defer, json, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import { Await } from 'react-router-dom';
import {  QRCodeBox } from '../components/QRcode/QRCodeBox';
export const StudentPage = () => {
  const [showPinjam,setShowPinjam]=useState(true);
  const pinjamHandler=()=>{
    setShowPinjam(true);
  }
  const kembaliHandler=()=>{
    setShowPinjam(false);
  }
  const {pinjam,kembali}=useLoaderData("pinjam-kembali-buku")
  return (
    <div className={classes.content}>

          <Sidebar/>
          <div className={classes.maintoptop}>
            <StudentChart showPinjam={showPinjam} showPinjamHandler={pinjamHandler} showKembaliHandler={kembaliHandler}/>
              <div className={classes["list-books"]}>
               { showPinjam && <Suspense fallback={<p>Loading...</p>}>
                  <Await resolve={pinjam}>
                      {loadedData=><PeminjamanBuku  books={loadedData} />}
                  </Await>
                </Suspense>}
                {!showPinjam && <Suspense fallback={<p>Loading...</p>}>
                  <Await resolve={kembali}>
                      {loadedData=><PeminjamanBuku  books={loadedData} />}
                  </Await>
                </Suspense>}

            </div>
          </div>
           <div>

          {/*   <StudentCard/> */}

          <QRCodeBox/>
            <Suspense fallback={<p>Loading...</p>}>
              <Await resolve={pinjam}>
              {loadedData=><LatestBook latest={loadedData.filter((book,i,{length})=>i===length -1)}/>}
              </Await>
            </Suspense>

           </div>




        </div>


  )
}



const loadReturned=async (id)=>{

  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/siswa/buku/histori-pengembalian/" + id)
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
    console.log(resData.pengembalian)
    return resData.pengembalian;
  }
}

const loadBorrowed=async (id)=>{
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/siswa/buku/histori-peminjaman/"+id)
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
    console.log(resData.peminjaman)
    return resData.peminjaman;
  }
}

export async function loader(id) {
  return defer({
    pinjam:loadBorrowed(id),
    kembali:loadReturned(id),
  })
}



