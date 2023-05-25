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
import { QRCodeBox } from '../components/QRcode/QRCodeBox';
import { useCart } from "react-use-cart";
import { BookingBuku } from './BookingBuku';
import { PengembalianBuku } from './PengembalianBuku';


export const StudentPage = () => {
  const [showPinjam, setShowPinjam] = useState(true);
  const [showKembali, setShowKembali] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const isAuth = useSelector(state => state.auth.isAuth);


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



  const { pinjam, kembali, booking } = useLoaderData("pinjam-kembali-booking-buku")
  console.log(booking)
  const CekKembali = kembali.filter(item => item.id_siswa === 1);
  const CekBooking = booking.filter(item => item.id_siswa === 1)
  console.log(kembali)

  if (!isAuth) {

    return <Navigate to="/" />;
  }
  return (
    <div className={classes.content}>

      <Sidebar />
      <div>
        <StudentChart showPinjam={showPinjam} showKembali={showKembali} showBooking={showBooking} showPinjamHandler={pinjamHandler} showKembaliHandler={kembaliHandler} showBookingHandler={bookingHandler} />
        <div className={classes["list-books"]}>
          {showPinjam && <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={pinjam}>
              {loadedData => <PeminjamanBuku books={loadedData} />}
            </Await>
          </Suspense>}

          {showKembali && <Suspense fallback={<p>Loading...</p>}>

            <PengembalianBuku books={CekKembali} />

          </Suspense>}

          {showBooking && <Suspense fallback={<p>Loading...</p>}>

            <BookingBuku books={CekBooking} />

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

  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/siswa/buku/histori-pengembalian/" + id)
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
    console.log(resData.pengembalian)
    return resData.pengembalian;
  }
}
// http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/(id_pemesanan}
const loadBorrowed = async () => {
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/pengembalian")
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
    console.log(resData.peminjaman)
    return resData.peminjaman;
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
  const data = await loadBorrowed();
  const dataB = await loadBooking();
  const peminjamanData = data;
  const bookingData = dataB

  return defer({
    pinjam: loadBorrowed(id),
    kembali: peminjamanData,
    booking: bookingData,

  })
}



