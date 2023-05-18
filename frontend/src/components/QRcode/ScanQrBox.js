import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

export const ScanQrBox = (props) => {
  const [data, setData] = useState('No resulasdadt');
  const [showCamera,setShowCamera]=useState(false);

  const showHandler=()=>{
    setShowCamera(prev=>!prev);
  }
  return (
    <>
    <div style={{ width:"500px",textAlign:"center",margin:"auto" }}> 
    {showCamera && <QrReader 
        onResult={(result, error) => {
          if (!!result) {
            console.log("halo")
            setData(result?.text);
          }

          if (!!error) {
            console.info("Bursss");
          }
        }}
        style={{ width:"20",width:"20",borderRadius:"20" }}
      />}
        <button onClick={showHandler}>{!showCamera?"Open Camera":"Close Camera"}</button>
      <p>{data}</p>
    </div>
      
    </>
  );
};