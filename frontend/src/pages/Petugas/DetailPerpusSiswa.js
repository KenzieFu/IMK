import React, { useEffect, useState } from 'react'
import classes from "../StudentPage.module.css";

import { StudentChart } from '../../components/StudentChart';
import { PeminjamanBuku } from '../PeminjamanBuku';

import { useSelector } from 'react-redux';
import { Navigate, defer, json, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import { Await } from 'react-router-dom';


import { PengembalianBuku } from '../PengembalianBuku';
import { BookingBuku } from '../BookingBuku';


export const DetailPerpusSiswa = () => {
  const [showPinjam, setShowPinjam] = useState(true);
  const [showKembali, setShowKembali] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const[render,setRender]=useState(false);




const renderHandler=()=>{

  setRender(prev=>!prev);
}


  const pinjamHandler = () => {
    setShowPinjam(true);
    setShowKembali(false)
    setShowBooking(false)
  }
  const kembaliHandler = () => {
    setShowKembali(true)
    setShowPinjam(false);
    setShowBooking(false)

  }
  const bookingHandler = () => {
    setShowBooking(true)
    setShowKembali(false)
    setShowPinjam(false);
  }



  const { pinjam, kembali, booking,count,siswa } = useLoaderData("petugas-pinjam-kembali-booking-buku")
  console.log(booking)
  
  const CekBooking = booking


  return (
    <div className={classes.content}>

      
   
     
      <div>
      <Suspense>
            <Await resolve={siswa}>
                {loadedData =>
                      <div>
                      <h2>Detail Siswa</h2>
                      <p>{loadedData.nama_lengkap}</p>
                      <div style={{ display:"flex" }}>
                        <button onClick={pinjamHandler}>Dipinjam</button>
                        <button onClick={kembaliHandler}>Dikembalikan</button>
                        <button onClick={bookingHandler}>Dibooking</button>
                    </div>
                      </div>
                
                }
          
            </Await>
        </Suspense>

        <div className={classes["list-books"]}>
          {showPinjam && <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={pinjam}>
              {loadedData => <PeminjamanBuku books={loadedData} />}
            </Await>
          </Suspense>}

          {showKembali && <Suspense fallback={<p>Loading...</p>}>
              <Await resolve={kembali}>
              {loadedData=><PengembalianBuku books={loadedData} />}
              </Await>

          </Suspense>}

          {showBooking && <Suspense fallback={<p>Loading...</p>}>

            <BookingBuku rerender={renderHandler} books={CekBooking} />

          </Suspense>}


        </div>
      </div>
    </div>


  )
}

const loadReturned = async (id) => {

  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/pengembalian/" + id)
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch books.' },
      {
        status: 500,
      }
    );
  }

    const resData = await response.json();
    console.log(resData)
    return resData;

}
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/(id_pemesanan}
const loadBorrowed = async (id) => {
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/peminjaman-siswa/"+id)
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch books.' },
      {
        status: 500,
      }
    );
  }
  else {
    const resData = await response.json();
   /*  console.log(resData.peminjaman) */
    return resData;
  }
}

const loaderSiswa=async(id)=>{
    const response= await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/siswa/"+id);
    console.log(response);
    if (!response.ok) {
      throw json(
        { message: 'Could not fetch siswa.' },
        {
          status: 500,
        }
      );
    }
    else {
      const resData = await response.json();
  
      return resData
    }
}


const loadBooking = async (id) => {
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku")
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch books.' },
      {
        status: 500,
      }
    );
  }
  else {
    const resData = await response.json();
    console.log(resData)
    return resData
  }
}

export async function loader({params}) {
    const id = params.idSiswa
    
  const data = await loadBorrowed(id);
  const dataB = await loadBooking(id);
  const dataR= await loadReturned(id)
  const objectData=dataB.map(data=>data);
  console.log(objectData)
  const bookingData = objectData?.filter((data)=>data?.id_siswa == id);
    console.log(id)
    const count ={
      countPeminjaman:data.length,
      countPemesanan :dataB?.filter((data)=>data?.siswa.id_siswa === id).length,
    }
    console.log(bookingData)

  return defer({
    pinjam: loadBorrowed(id),
    kembali: dataR,
    booking: bookingData,
    count:count,
    siswa:loaderSiswa(id)

  })
}

export const action=async({params,request})=>{
  let url="http://localhost:8080/perpustakaan-methodist-cw/pemesanan-batal/";
  const data=await request.formData()

  const response = await fetch(url+ data.get("id_pemesanan"), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer",
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete Item." },
      {
        status: 500,
      }
    );
  }
  return response


}



