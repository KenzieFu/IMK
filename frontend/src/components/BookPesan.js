import React, { useRef, useState } from 'react'
import { Box } from '../UI/Box'
import classes from "./BookKembali.module.css"
import { Link, json, useSubmit } from 'react-router-dom'
import { ConfirmationModal } from './modals/ConfirmationModal'

export const BookPesan = ({book,rerender}) => {
  const formRef=useRef();
  const [showConfirm,setConfirm]=useState(false);
  const submit=useSubmit()

  const handleDelete=async(id)=>{

    const formData=new FormData(formRef.current);
    console.log(id)
    formData.append("id_pemesanan",id)
    submit(formData,{method:"DELETE"});
    handleModal();
    /* let url="http://localhost:8080/perpustakaan-methodist-cw/pemesanan-batal/";
    const response = await fetch(url+ id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer",
      },
    });
  
    if (!response.ok) {
      throw json(
        { message: "Could not delete Item." },
        {
          status: 500,
        }
      );
    }

    handleModal(); */
  }
  console.log(showConfirm)
  const handleModal=()=>{
    console.log("afkbfepiwpfoae")
    setConfirm(prev=>!prev);
    rerender()
  }


  return (
    <>
        <Box>
        <div style={{ marginLeft:"5px", display:"flex",padding:'35px' }}>
            <img sty width="150px" height="210" src={`http://localhost:8080${book.buku.gambar_buku}`} alt="" />
            <div className={classes["book-info"]} id='book-info'>
                {/* <span className={classes["due-date"]}>{book.pengembalian.status}</span> */}
                <div style={{ display:"flex",justifyContent:"space-between", alignItems:"center",marginBottom:"0",paddingBottom:"0" }}>
                  <div>
                  <h1 className={classes["book-info_h1"]}>{book.buku.judul_buku}</h1>
                  <p style={{ marginTop:"0",paddingTop:"0"  }}>{book.buku.pengarang}</p>
                  <div style={{ marginTop:"15px" }}>
                    <p>Tanggal Booking   :{book.tanggal}</p>
                    <p>Waktu Booking   :{book.waktu}</p>
                  </div>
                  </div>
                    <Link type='button' to={`/library/${book.buku.id_buku}`} className={classes["book-info_button"]}>Details</Link>

                    <button  onClick={()=>handleModal()} className={classes['book-info_cancel']}>Batalkan Pemesanan</button>
                </div>
            </div>
        </div>
    </Box>

     {showConfirm && <ConfirmationModal method="DELETE" ref={formRef} deleteItem={handleDelete.bind(this,book.id_pemesanan)} onClose={handleModal} book={book.buku.judul_buku}/>}
    </>
    
  )
}
