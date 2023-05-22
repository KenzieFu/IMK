import React from 'react'
import { Box } from '../UI/Box'
import classes from './StudentChart.module.css'
import { BookBar } from '../UI/BookBar'
import { useSelector } from 'react-redux'
export const StudentChart = (props) => {
    const student=useSelector((state)=>state.auth.user);
    console.log(student)
    let currentBarPinjamClassName= `${classes.currentBar}  ${!props.showPinjam?classes.not:""}`;
    let currentBarKembaliClassnName= `${classes.currentBar}  ${props.showPinjam?classes.not:""}`;
    let barPinjamClassName=`${classes["highlight-line"]} ${!props.showPinjam?classes.notBar:""}`;
    let barKembaliClassName=`${classes["highlight-line"]} ${props.showPinjam?classes.notBar:""}`;

  return (
    <>
        <Box>
            <div style={{ padding:"0 0 0 30px" }}>
            <div className={classes.info}>
                <h1>Halo, {student.username}!</h1>
                <span>Sudahkah kamu membaca buku hari ini?</span>
            </div>
            <div className={classes.chart}>
                <BookBar image="./assets/bukuPinjam.png" label="Buku Pinjam" color="#FF0000" />
                <BookBar image="./assets/clockVector.png" label="Lama Membaca" color="#FFBD35"/>
                <BookBar image="./assets/bukuKembali.png" label="Buku Kembali" color="#49CF78" />
                <BookBar image="./assets/chartVector.png" label="Peringkat Membaca" color="#1388CD" />
            </div>
           <div className={classes.history} >
            <h2>Riwayat Peminjaman Buku</h2>
                <nav className={classes.navbar} >
                    <ul style={{ display:"flex",gap:"25px" }}>
                        <li onClick={props.showPinjamHandler} className={currentBarPinjamClassName}>
                            Dipinjam
                            <span className={barPinjamClassName}></span>
                        </li>
                        <li onClick={props.showKembaliHandler} className={currentBarKembaliClassnName}>Dikembalikan
                        <span className={barKembaliClassName}></span></li>
                    </ul>
                    <span style={{ fontWeight:"bolder" }}>Sort By</span>
                </nav>
           </div>
           </div>
        </Box>
    </>
  )
}
