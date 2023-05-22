import React from 'react'
import classes from './Footer.module.css'
export const Footer = () => {
return (
<footer className={classes.footer}>

  <div className={classes.main} >
    <div className={classes["left-footer"]}>
      <h2>Alamat</h2>
      <span>Komplek CBD. Polonia Blok CC No.108Jl. Padang Golf (dalam)</span>
      <span>Medan – Sumatera Utara 20157 Indonesia</span>
    </div>

    <div className={classes.img}>
      <img className={classes.logo} src="./assets/logopng.png" alt="" />
    </div>
    <div className={classes["right-footer"]}>
      <h2>Kontak kami</h2>
      <table>
        <tr>
          <td>Email</td>
          <td>&nbsp; : &nbsp;</td>
          <td>info@methodistcw.sch.id </td>
        </tr>
        <tr>
          <td>Phone</td>
          <td> &nbsp; : &nbsp;</td>
          <td>(061) – 4277 1542</td>
        </tr>
        <tr>
          <td>WhatsApp</td>
          <td> &nbsp; : &nbsp;</td>
          <td>0878 6912 3707 </td>
        </tr>
      </table>
    </div>
  </div>

  <div className={classes.hori}>
    <h2 style={{ padding:"0 1vw", background:"white",display:"inline" }}>Methodist Charles Wesley</h2>
  </div>
  <div style={{ marginTop:"1.8vw", textAlign:"center" }}>Copyright © - Methodist Charles Wesley School</div>



</footer>
)
}