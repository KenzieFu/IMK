import React, { useState } from 'react'
import classes from "./StudentPage.module.css";
import { Sidebar } from '../UI/Sidebar';
import { StudentChart } from '../components/StudentChart';
import { StudentCard } from '../components/StudentCard';
import { LatestBook } from '../components/LatestBook';
import { PeminjamanBuku } from './PeminjamanBuku';
import { useSelector } from 'react-redux';
import { Navigate, defer, json, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import { Await } from 'react-router-dom';
import {  QRCodeBox } from '../components/QRcode/QRCodeBox';
export const StudentPage = () => {
  const [showPinjam,setShowPinjam]=useState(true);
  const [showKembali,setShowKembali]=useState(true);
  const [showBooking,setShowBooking]=useState(true);
  const isAuth=useSelector(state=>state.auth.isAuth);
  const {pinjam,kembali}=useLoaderData("pinjam-kembali-buku")

  const pinjamHandler=()=>{
    setShowPinjam(true);
  }
  const kembaliHandler=()=>{
    setShowPinjam(false);
  }
  const bookingHandler=()=>{
    setShowPinjam(false);
  }
  const {pinjam,kembali}=useLoaderData("pinjam-kembali-booking-buku")

  if(!isAuth)
  {
    return <Navigate to="/"/>;
  }
  return (
    <div className={classes.content}>

          <Sidebar/>
          <div>
            <StudentChart showPinjam={showPinjam} showPinjamHandler={pinjamHandler} showKembaliHandler={kembaliHandler} showBookingHandler={bookingHandler}/>
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
                { showKembali && <Suspense fallback={<p>Loading...</p>}>
                  <Await resolve={kembali}>
                      {loadedData=><PeminjamanBuku  books={loadedData} />}
                  </Await>
                </Suspense>}
                {!showKembali && <Suspense fallback={<p>Loading...</p>}>
                  <Await resolve={kembali}>
                      {loadedData=><PeminjamanBuku  books={loadedData} />}
                  </Await>
                </Suspense>}
                {/* { showBooking && <Suspense fallback={<p>Loading...</p>}>
                  <Await resolve={booking}>
                      {loadedData=><PeminjamanBuku  books={loadedData} />}
                  </Await>
                </Suspense>}
                {!showBooking && <Suspense fallback={<p>Loading...</p>}>
                  <Await resolve={kembali}>
                      {loadedData=><PeminjamanBuku  books={loadedData} />}
                  </Await>
                </Suspense>} */}


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
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/(id_pemesanan}
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

// const loadBooking=async (id)=>{
//   const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/"+id)
//   console.log(response);
//   if(!response.ok)
//   {
//     throw json(
//       { message: 'Could not fetch books.' },
//       {
//         status: 500,
//       }
//     );
//   }
//   else{
//     const resData=await response.json();
//     console.log(resData.peminjaman)
//     return resData.peminjaman;
//   }
// }

export async function loader(id) {
  return defer({
    pinjam:loadBorrowed(id),
    kembali:loadReturned(id),
  })
}



