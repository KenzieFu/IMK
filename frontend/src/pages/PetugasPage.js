import React from 'react'
import classes from "./PetugasPage.module.css"

export const PetugasPage = () => {
  return (
    <>
        <div className={classes['main']}>

          <div className={classes['sidebar']}>
            <h1> Petugas MCW </h1>

            <div className={classes['logo']}>
            <img src="/assets/logopng.png" className={classes['logoimg']} alt="" />
            </div>

            <p> <i class="fa fa-home" aria-hidden="true"></i> &nbsp; Home </p>
            <p> <i class="fa fa-users" aria-hidden="true"></i> &nbsp; Absensi </p>
            <p> <i class="fa fa-qrcode" aria-hidden="true"></i> &nbsp; Scan Masuk </p>
            <p> <i class="fa fa-qrcode" aria-hidden="true"></i> &nbsp; Scan Keluar </p>
            <p> <i class="fa fa-sign-out" aria-hidden="true"></i> &nbsp; Log out </p>
          </div>

          <div className={classes['mainup']}>  
            <div className={classes['upcont']}>
            <h1>Dashboard Petugas</h1>
            <p> Welcome back, Kenjod</p>
            </div>

          </div>



          <div className={classes['mainin']}></div>
        </div>
    </>
  )
}
