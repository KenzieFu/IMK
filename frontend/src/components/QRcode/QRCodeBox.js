import React from 'react'
import QRCode from 'react-qr-code';
import classes from './QRCodeBox.module.css'
import { useSelector } from 'react-redux';
export const QRCodeBox = () => {
 const value=useSelector(state=>state.auth.user?.user);
  return (
    <div className={classes.qrcode}>
      {
        value &&
        <QRCode
        title="QR Code Anda"
        value={JSON.stringify(value)}
        size={280}/>
      }
        
      <div className={classes.qrtext}>
        <span><i class="fa fa-caret-up" aria-hidden="true"></i> &nbsp;  Scan untuk masuk perpus &nbsp; <i class="fa fa-caret-up" aria-hidden="true"></i> </span>
      </div>  
    </div>
  )
}
