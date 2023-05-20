import React from 'react'
import QRCode from 'react-qr-code';
import { useSelector } from 'react-redux';
export const QRCodeBox = () => {
 const value=useSelector(state=>state.auth.user.user);
 console.log(value);
  return (
    <div>
        <QRCode
        title="GeeksForGeeks"
        value={JSON.stringify(value)}
        size={300}/>
    </div>
  )
}
