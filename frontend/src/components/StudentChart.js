import React from 'react'
import { Box } from '../UI/Box'
import classes from './StudentChart.module.css'
import { BookBar } from '../UI/BookBar'
import { useSelector } from 'react-redux'
export const StudentChart = (props) => {
    const student=useSelector((state)=>state.auth.user);
    
    console.log(student)
    let currentBarPinjamClassName= `${classes.currentBar}  ${!props.showPinjam?classes.not:""}`;
    let currentBarKembaliClassnName= `${classes.currentBar}  ${!props.showKembali?classes.not:""}`;
    let currentBarBookingClassnName= `${classes.currentBar}  ${!props.showBooking?classes.not:""}`;
    let barPinjamClassName=`${classes["highlight-line"]} ${!props.showPinjam?classes.notBar:""}`;
    let barKembaliClassName=`${classes["highlight-line"]} ${!props.showKembali?classes.notBar:""}`;
    let barBookingClassName=`${classes["highlight-line"]} ${!props.showBooking?classes.notBar:""}`;

    console.log(`Count Pinjam : ${props.count.countPeminjaman}`);
    console.log(`Count Pesanan : ${props.count.countPemesanan}`);

    const countPinjam=props.count.countPeminjaman;
    const countPesan=props.count.countPemesanan;
  return (
    <>
        <Box>
            <div className={classes.maintop}>
            <div className={classes.infotop}>
            <div className={classes.info}>
                <h1>Halo, {student.username}!</h1>
                <span>Sudahkah kamu membaca buku hari ini?</span>
            </div>
            <div className={classes.chart}>
                <BookBar image="./assets/bukuPinjam.png" current={countPinjam} max="3" label="Buku Pinjam" color="#FF0000" />
               {/*  <BookBar image="./assets/clockVector.png" max={} label="Lama Membaca" color="#FFBD35"/> */}
                <BookBar image="./assets/bukuKembali.png" current={countPesan} max={countPesan?3-countPinjam:"-"} label="Buku Dibooking" color="#49CF78" />
         {/*        <BookBar image="./assets/chartVector.png" label="Peringkat Membaca" color="#1388CD" /> */}
            </div>
            </div>
           <div className={classes.history} >
            <h1>Riwayat Peminjaman Buku</h1>
                <nav className={classes.navbar} >
                    <ul style={{ display:"flex",gap:"25px" }}>
                        <li onClick={props.showPinjamHandler} className={currentBarPinjamClassName}>
                            Dipinjam
                            <span className={barPinjamClassName}></span>
                        </li>
                        <li onClick={props.showKembaliHandler} className={currentBarKembaliClassnName}>
                            Dikembalikan
                        <span className={barKembaliClassName}></span></li>
                        <li onClick={props.showBookingHandler} className={currentBarBookingClassnName}>
                            Dibooking
                        <span className={barBookingClassName}></span></li>
                    </ul>
                    <span style={{ fontWeight:"bolder" }}>Sort By <i class="fa fa-caret-down" aria-hidden="true"></i></span>
                </nav>
           </div>
           </div>
        </Box>
    </>
  )
}
