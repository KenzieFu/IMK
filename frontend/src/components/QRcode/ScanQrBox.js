import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import classes from "./ScanQrBox.module.css"
const QrOverlay = (scan) => {
  return (
    <svg className={classes.scanOverlay} viewBox='0 0 100 100'>
        <path fill='none' d='M13,0 L0,0 L0,13' stroke={scan?"green":"white"} strokeWidth={5}/>
        <path fill='none' d='M0,87 L0,100 L13,100' stroke={scan?"green":"white"} strokeWidth={5}/>
        <path fill='none' d='M87,100 L100,100 L100,87' stroke={scan?"green":"white"} strokeWidth={5}/>
        <path fill='none' d='M100,13 L100,0 87,0' stroke={scan?"green":"white"} strokeWidth={5}/>
    </svg>
  )
}


export const ScanQrBox = () => {
  const [data, setData] = useState('No result');
  const [showCamera,setShowCamera]=useState(false);
  const [scan,setScan]=useState(false);
  const showHandler=()=>{
    console.log("hioiafi")
    setShowCamera(prev=>!prev);
  }

  

  const scanHandler=(result,error)=>{
    if (!!result) {
      console.log("halo")
      setScan(true);
      setData(result?.text);
    }

    if (!!error) {
      setScan(false);
      console.info("Bursss");
    }
  }
  return (
    <>
    <div style={{ display:"flex",alignContent:"center", textAlign:"center", flexDirection:"column"}} >

    <div style={{ textAlign:"center" ,margin:"auto" }} >
    {showCamera && <QrReader 
        scanDelay={1000}
        onResult={(result, error) => {
          if (!!result) {
            console.log("halo");
            setScan(true)
            const parsedResult=JSON.parse(result?.text)
            setData(parsedResult);
          }

          if (!!error) {
            console.info("Bursss");
  
          }
        }} 
       containerStyle={{ width:"500px" ,height:'600px' }}
       videoContainerStyle={{ width:'500px', height:"550px" }}
        ViewFinder={()=>QrOverlay(scan)}
      />}
      </div>
      
      <div style={{ display:"block" }}>
      <button onClick={showHandler}>{!showCamera?"Open Camera":"Close Camera"}</button>
      <p>{data.nama_lengkap } mengunjungi perpustakaan</p>
      </div>
       
    </div>
      
    </>
  );
};

