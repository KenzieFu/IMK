import BarcodeScannerComponent from "react-qr-barcode-scanner";
import React from 'react'

export const ScanBarcode = ({onClose}) => {
    const [data, setData] = React.useState("Not Found");
    console.log(data)
  return (
    <>
    <div>
    <BarcodeScannerComponent
        width={700}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
       
        }}
      />
      <p>{data}</p>
      <button onClick={onClose}>Cancel</button>
    </div>

        
    </>
  )
}
