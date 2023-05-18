import React from 'react'
import QRCode from 'react-qr-code';

export const QRCodeBox = () => {
  const value="eoifwf";
  return (
    <div>
        <QRCode
        title="GeeksForGeeks"
        value={value}
        size={300}/>
    </div>
  )
}
