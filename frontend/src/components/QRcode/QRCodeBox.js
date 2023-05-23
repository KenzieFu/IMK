import React from 'react'
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
export const QRCodeBox = () => {
 const value=useSelector(state=>state.auth.user?.user);
  return (
    <div>
      {
        value &&
        <QRCode
        title="QR Code Anda"
        value={JSON.stringify(value)}
        size={300}/>
      }
        
    </div>
  )
}
