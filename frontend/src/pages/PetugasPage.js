import React from 'react'
import classes from "./PetugasPage.module.css"
import { NavLink, Outlet, useNavigate } from 'react-router-dom'



export const PetugasPage = () => {
  
  return (
    <>
        <div className={classes['main']}>

          {/* <div className={classes['sidebar']}>
            <h1> Petugas MCW </h1>

            <div className={classes['logo']}>
            <img src="/assets/logopng.png" className={classes['logoimg']} alt="" />
            </div>

            <p> <i class="fa fa-home" aria-hidden="true"></i> &nbsp; Home </p>
            <p> <i class="fa fa-users" aria-hidden="true"></i> &nbsp; Absensi </p>
            <p> <i class="fa fa-sign-out" aria-hidden="true"></i> &nbsp; Log out </p>
          </div> */}

          <div className={classes['mainup']}>  
            <div className={classes['upcont']}>
            <div className={classes['topcont']}>
            <h1>Dashboard <i class="fa fa-pie-chart" aria-hidden="true"></i> </h1>
            <p> Welcome back, kenjod</p>

            <div className={classes['titl2']}>
            <span>Website untuk petugas <br></br>Methodist Charles Wesley</span> 
            <img src="/assets/logopng.png" className={classes['logoimg']} alt="" />
            </div>
            </div>


            <div className={classes['scanin']}>
              <div className={classes['scanincont']}>
              <h1>Scan In <i class="fa fa-qrcode" aria-hidden="true"></i> </h1>
              <p>Scan qrcodemu untuk masuk kedalam perpustakaan</p>
              <NavLink to="/petugas/scan"> <p class={classes["butcli"]}>Scan disini  </p></NavLink>
              </div>
              </div>
              <div className={classes['batchdown']}> 
              <div className={classes["scanout"]}>
                <div className={classes['scanoutcont']}>
                <h1>Scan Out <i class="fa fa-qrcode" aria-hidden="true"></i> </h1>
                <p>Scan qrcodemu sebelum keluar dari perpustakaan</p>
                <NavLink to="/petugas/scan-keluar"> <p class={classes["butcli"]}> Scan disini </p></NavLink>
                </div>
              </div>
              <div className={classes['absensi']}>
                <div className={classes['absencont']}>
                  <h1>Absensi <i class="fa fa-users" aria-hidden="true"></i></h1>
                  <p>Cek daftar absensi perpustakaan disini </p>
                  <NavLink to="/petugas/absensi"><p class={classes["butcli"]}> Cek disini </p></NavLink>
                </div>
              </div>
              </div>

            </div>

          </div>
        </div>
    </>
  )
}
