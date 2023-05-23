import React from 'react'
import PetugasModal from '../../UI/Modals/PetugasModal'
import classes from "./errorModal.module.css"
export const ErrorModal = ({onClose,message}) => {
 let bigTextclassName=[classes["big-text"],message?.status!=="sukses"?classes.fail:" "].join("  ")
 let closeButton=[classes["close-button"],message?.status!=="sukses"?classes["background-fail"]:" "].join(" ")
 let imgSrc=`${message?.status==="sukses"?"/assets/Icons/success.png":"/assets/Icons/failed.png"}`
 let curCircle=[classes.circle,message?.status!=="sukses"?classes.red:" "].join(" ");
 console.log(closeButton)
  return (
    <>

      <PetugasModal  onClose={onClose}>
        
        <div  style={{ position:"relative",display:"flex",flexDirection:"column" }}>
            <div onClick={onClose} className={classes["close-icon"]}><span className={classes.close} ><i class="fa fa-times" aria-hidden="true"></i></span></div>
        </div>
         
          <div style={{ textAlign:"center",marginTop:"20px" }}
          > <div className={classes.container}>
               <img className={classes["animation"]} src={imgSrc} alt="" />
               <div className={curCircle} style={{ animationDelay:"0s" }}></div>
               <div className={curCircle} style={{ animationDelay:"2s" }}></div>
              
        
        
          </div>
           
            <div className={bigTextclassName} > {message?.status==="sukses"?"Sukses":"Gagal"}</div>
          </div>

          <p className={classes.message}>{message?.message}</p>
          <div style={{ textAlign:"center", marginTop:"60px",marginBottom:"80px" }}>
          <button className={closeButton} onClick={onClose} >OK</button>
          </div>
          
      </PetugasModal>
    </>
  )
}
