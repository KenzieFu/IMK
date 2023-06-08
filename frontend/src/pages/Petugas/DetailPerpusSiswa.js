import React, { useEffect, useState } from 'react'
import classes from "./DetailPerpusSiswa.module.css";

import { StudentChart } from '../../components/StudentChart';
import { PeminjamanBuku } from '../PeminjamanBuku';

import { useSelector } from 'react-redux';
import { Navigate, defer, json, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';
import { Await } from 'react-router-dom';
import { ScanBarcode } from '../../components/BarcodeScanner/ScanBarcode';
import Modal from '../../UI/Modal';
import { PengembalianBuku } from '../PengembalianBuku';
import { BookingBuku } from '../BookingBuku';




export const DetailPerpusSiswa = () => {
  const [showPinjam, setShowPinjam] = useState(true);
  const [showKembali, setShowKembali] = useState(false);
  const [showCam,setCam]=useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const[render,setRender]=useState(false);


  const camHandler=()=>{
    setCam(prev=>!prev);
  }

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
       {
      showCam  &&
      <Modal onClose={camHandler}>
        <ScanBarcode item={siswa} tipe="create-pinjam"  onClose={camHandler}/>
      </Modal>
     }
      
   
     
      <div className={classes.insides}>
      <Suspense>
            <Await resolve={siswa}>
                {loadedData =>
                      <div className={classes.headtitle}> 
                      <div className={classes['txtz']}>
                      <h1>Detail Siswa <i class="fa fa-graduation-cap" aria-hidden="true"></i></h1>
                      <p>Detail siswa untuk <b>{loadedData.nama_lengkap}</b></p>
                      </div>
                      <div className={classes['butbatch']}>
                      <div className={classes['buttonsb']}>
                        <button className={classes['buttz']} onClick={pinjamHandler}>Dipinjam</button>
                        <button className={classes['buttz']} onClick={kembaliHandler}>Dikembalikan</button>
                        <button className={classes['buttz']} onClick={bookingHandler}>Dibooking</button>
                    </div>
                    <div className={classes['tmbhp']}>
                      <button className={classes['buttz']}  onClick={camHandler}>Tambah Peminjaman <i class="fa fa-plus" aria-hidden="true"></i></button>
                    </div>
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
    siswa:await loaderSiswa(id)

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



/* const handleCreate = async () => {
  try {

    const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer"
      },
      body: JSON.stringify({
        id_siswa: selectedSiswa,
        id_buku: selectedBuku

      })
    });

    const createdData = await response.json();
    console.log('Data created:', createdData);

    // Reset the form after successful creation

  } catch (error) {
    console.error('Error creating data:', error);
  }
};

const navigate=useNavigate();
const backHandler=()=>{
  navigate("..");
} */




/* //Kembalikan Buku Perpus
\
export async function action({ params, request }) {

  const method = request.method;
  const data = await request.formData();
  console.log(data);
  const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/' + data.get('id'), {
    method: method,
    headers: {
      "Authorization": "Bearer",

    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete this row.' },
      {
        status: 500,
      }
    );

  }
  return redirect("/admin/borrowed-books");
} */
