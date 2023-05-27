import React, { useRef, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import classes from "./ScanQrBox.module.css"
import { Form, useSubmit } from 'react-router-dom';
import { useForm } from 'react-hook-form';
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



export const ScanQrBox = (props) => {
  const formRef =useRef();
  const submit=useSubmit();
  const [data, setData] = useState('No result');
  const [showCamera,setShowCamera]=useState(false);
  const [scan,setScan]=useState(false);
  const showHandler=()=>{
    console.log("hioiafi")
    setShowCamera(prev=>!prev);
  }
  

  const scanHandler=(result,error)=>{
      let method=props.label ==="keluar perpustakaan"?"PUT":"POST"
      if (!!result && !props.showInfo) {
        props.showHandler();
      
        console.log("halo")
        setScan(true);
        setData(result?.text);
        const form=new FormData(formRef.current);
        const parsedResult=JSON.parse(result?.text)
        form.append("data",result?.text);
        setData(parsedResult);
        
        submit(form,{method:method});
       
        
      }
  
      if (!!error && !props.showInfo) {
        setScan(false);
        console.info("Bursss");
      }
    
    
  };
  return (
    <>
    <div style={{ display:"flex",alignContent:"center", textAlign:"center", flexDirection:"column"}} >
 
    <div style={{ textAlign:"center" ,margin:"auto" }} >
    {showCamera && !props.showInfo &&   <Form  ref={formRef} method='POST'>
     <QrReader
         
        scanDelay={500}
        onResult={scanHandler}
       containerStyle={{ width:"500px" ,height:'600px' }}
       videoContainerStyle={{ width:'500px', height:"550px" }}
        ViewFinder={()=>QrOverlay(scan)}
      /></Form>}
      </div>
      
      <div style={{ display:"block" }}>
      <button className={classes['scanbut']} onClick={showHandler}>{!showCamera?"Open Camera":"Close Camera"}</button>
      <p>{data.nama_lengkap } {props.label}</p>
      </div>
      
    </div>
      
    </>
  );
};

