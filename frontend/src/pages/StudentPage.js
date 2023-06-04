import React, { useEffect, useState } from 'react'
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
import { QRCodeBox } from '../components/QRcode/QRCodeBox';
import { BookingBuku } from './BookingBuku';
import { PengembalianBuku } from './PengembalianBuku';
import { getUserCredentials } from '../components/util/auth';

export const StudentPage = () => {
  const [showPinjam, setShowPinjam] = useState(true);
  const [showKembali, setShowKembali] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const[render,setRender]=useState(false);
  const isAuth = useSelector(state => state.auth.isAuth);
  const akun=useSelector(state=>state.auth.user)


console.log(isAuth)
console.log(akun)
  console.log(render)


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



  const { pinjam, kembali, booking,count } = useLoaderData("pinjam-kembali-booking-buku")
  console.log(booking)
  /* const CekKembali = kembali.filter(item => item.id_siswa === akun.user.id_siswa); */
  const CekBooking = booking.filter(item => item?.id_siswa === akun.user?.id_siswa);
  console.log(CekBooking)

  if (!isAuth) {

    return <Navigate to="/" />;
  }
  return (
    <div className={classes.content}>

      <Sidebar />
      <div>
        <Suspense>
          <Await resolve={count}>
          {loadedData =><StudentChart count={loadedData} showPinjam={showPinjam} showKembali={showKembali} showBooking={showBooking} showPinjamHandler={pinjamHandler} showKembaliHandler={kembaliHandler} showBookingHandler={bookingHandler} />}
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
      <div>

        {/*   <StudentCard/> */}

        <QRCodeBox />
        <Suspense fallback={<p>Loading...</p>}>
          <Await resolve={pinjam}>
            {loadedData => <LatestBook latest={loadedData.filter((book, i, { length }) => i === length - 1)} />}
          </Await>
        </Suspense>
      </div>
    </div>


  )
}

const loadReturned = async (id) => {
  const data =getUserCredentials()
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/pengembalian",{
    method:"GET",
    headers:{
      "Authorization":"Bearer "+data.accessToken
    }
  })
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
  const data = getUserCredentials();
  console.log(data.accessToken)
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/peminjaman-siswa-by-user",{
    method:"GET",
    headers:{
      "Authorization":"Bearer "+data.accessToken
    }
  })
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



const loadBooking = async (id) => {
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/")
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

    return resData
  }
}

export async function loader(id) {
  console.log(id)
  const data = await loadBorrowed(id);
  const dataB = await loadBooking(id);
  const dataR= await loadReturned(id)
    const count ={
      countPeminjaman:data.length,
      countPemesanan :dataB.filter((data)=>data.siswa.id_siswa === id).length,
    }
  const bookingData = dataB

  return defer({
    pinjam: loadBorrowed(id),
    kembali: dataR,
    booking: dataB,
    count:count

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



