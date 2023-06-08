import React, { useState } from 'react'
import { Box } from '../UI/Box'
import classes from "./Book.module.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Modal from '../UI/Modal'
import { ScanBarcode } from './BarcodeScanner/ScanBarcode'

export const Book = ({book}) => {
  const status=useSelector(state=>state.auth.user)
  const [showCam,setCam]=useState(false)
  const currentDate=new Date();

  const camHandler=()=>{
    setCam(prev=>!prev); 
  }
  
  const remainings=new Date(book.tanggal_kembali)-currentDate;
  const remaining=Math.floor(remainings /(1000*60*60*24));
  console.log(remainings)
  console.log(remaining)
  let checker= remaining<0?`Telat ${remaining*-1} hari`:remaining===0?`Hari ini`:`${remaining} hari lagi.`;
  return (
<>
{ status.hak_akses ==="Petugas"&& showCam &&
    <Modal onClose={camHandler}>
    <ScanBarcode item={book} tipe="selesaikan" onClose={camHandler}/>
</Modal>
}
    

    <div className={classes.boxescon}>


    <div className={classes["boxes"]}>
    <Box>
        <div style={{ display:"flex",padding:'35px' }}>
            <img sty width="150px" height="210" src={`http://localhost:8080${book.buku.gambar_buku}`} alt="" />
            <div className={classes["book-info"]} id='book-info'>
                <span className={classes["due-date"]}>{checker}</span>
                <div style={{ display:"flex",justifyContent:"space-between", alignItems:"center",marginBottom:"0",paddingBottom:"0" }}>
                  <div>
                  <h1 className={classes["book-info_h1"]}>{book.buku.judul_buku}</h1>
                  <p style={{ marginTop:"0",paddingTop:"0"  }}>{book.buku.pengarang}</p>
                  <div style={{ marginTop:"20px"}}>
                    <p>Tanggal Dipinjam : {book.tanggal_pinjam}</p>
                    <p>Deadline         : {book.tanggal_kembali}</p>
                  
                  </div>
                  </div>
                    {status.hak_akses==="Siswa" &&
                          <Link type='button' to={`/library/${book.buku.id_buku}`} className={classes["book-info_button"]}>Details</Link>
                    }
                  
                    {status.hak_akses === "Petugas" &&
                      <button onClick={camHandler}>Selesaikan</button>
                    }

                </div>

               {/*  <div className={classes.rating}>
                  <div className={classes.stars}>
                  <span className={'fa fa-star '+ classes.checked}></span>
                  <span className={'fa fa-star '+ classes.checked}></span>
                  <span className={'fa fa-star '+ classes.checked}></span>
                  <span className='fa fa-star'></span>
                  <span className='fa fa-star'></span>
                  </div>
                  <span>3.0</span>
                </div> */}
            </div>
        </div>
    </Box>
    </div>
  </div>
  </>
  )
}
