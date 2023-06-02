import React, { useState } from 'react'
import { ScanBarcode } from '../../components/BarcodeScanner/ScanBarcode'
import Modal from '../../UI/Modal';
export const BarcodeReaderPage = () => {
    const [openCam,setCam]=useState(false);
    const[feedback,setFeedback]=useState(true);

    const showCam=()=>{
        setCam(prev=>!prev);
    }
  return (
    <>
    {openCam &&
         <Modal onClose={showCam}>
            {
                openCam && !feedback &&
                      <ScanBarcode onClose={showCam}/>
            }
            {
                openCam && feedback &&
                    <div>Success</div>
            }
       
         </Modal>
    }
    {
        !openCam && <button onClick={showCam}>{openCam?"Close Cam":'Open Cam'}</button>
    }
        
    </>
  )
}
