import React, { useRef, useState } from 'react'
import { Box } from '../../UI/Box'
import { Await, useRouteLoaderData, useNavigate, redirect, useSubmit } from 'react-router-dom'
import { json,defer } from 'react-router-dom'
import { Suspense } from 'react'
import classes from './adminbatch.module.css';
import Modal from '../../UI/Modal'
import { toast } from 'react-toastify'

import { Form } from 'react-router-dom'
export const DetailBuku = () => {
    const notifyStatus = () => toast.success('Stok Buku Berhasil Diubah', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    const { bookDetail,stok }= useRouteLoaderData("admin-detail-buku");
    
    const [showStock,setStock]=useState(false);
    const submit = useSubmit();
    const navigate= useNavigate();

    const backHandler=()=>{
        navigate("..");
    }
    const editHandler=()=>{
        navigate(`/admin/books/${bookDetail.id_buku}/edit`)
    }
    const showHandler=()=>{
        setStock(prev=>!prev);
    }
    const submitHandler=(e)=>{
      
        submit(e.currentTarget,{method:stok?.stok?"PUT":"POST"});
        notifyStatus()

    }
  return (
    <>
    {showStock && <Modal onClose={showHandler}>

        <div style={{ display:"flex", justifyContent:"space-between" }}>
            <img src={`http://localhost:8080${bookDetail.gambar_buku}`} alt="" />
            <div className={classes.infotable}>
                                    <table>
                                        <tr>
                                            <td>Penulis</td>
                                            <td style={{ width: "5vw" }}>:</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{bookDetail.pengarang}</td>
                                        </tr>
                                        <tr>
                                            <td>Penerbit</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "15vw" }}>{bookDetail.penerbit}</td>
                                        </tr>
                                        <tr>
                                            <td>Tahun</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "15vw" }}>{bookDetail.tahun_terbit}</td>
                                        </tr>
                                        <tr>
                                            <td>ISBN</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "15vw" }}>{bookDetail.isbn}</td>
                                        </tr>
                                        <tr>
                                            <td>Genre</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "15vw" }}>{bookDetail.kategori.nama_kategori}</td>
                                        </tr>
                                    </table>
                                   
                                </div>
                              
                                <div style={{ display:"flex",justifyContent:"center",alignItems:"center", textAlign:"center", width:"10vw" }}>
                                <Form method={stok?"PUT":"POST"}>
                                    <input type="hidden" value={bookDetail.id_buku} name='id_buku' />
                                    <input name='stok' defaultValue={stok?stok.stok:0}  style={{ width:"50px" }} type="number" />
                                    <button onClick={(e)=>submitHandler(e)}>Edit</button>
                                    </Form>
                                </div>
                                
                               
        </div>
        <div onClick={showHandler}>Close</div>

        </Modal>}
    <Suspense>
        <Await resolve={bookDetail}>
            {(loadedData)=>
                {
                    return(
                <Box>

            <div className={classes.content}>
                <div className={classes.cardtopmain}>
                    <div className={classes.cardtop}>
                        <div className={classes.card}>
                            <div className={classes.cover}>
                                <img src={`http://localhost:8080${loadedData.gambar_buku}`}></img>
                            </div>

                            <div className={classes.book_info}>
                                <h2>{loadedData.judul_buku}</h2>
                                <div className={classes.summary}>
                                    {/* <h3>Sinopsis</h3> */}
                                    <p>{loadedData.sinopsis}</p>
                                </div>
                                <div className={classes.infotable}>
                                    <table>
                                        <tr>
                                            <td>Penulis</td>
                                            <td style={{ width: "5vw" }}>:</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{loadedData.pengarang}</td>
                                        </tr>
                                        <tr>
                                            <td>Penerbit</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{loadedData.penerbit}</td>
                                        </tr>
                                        <tr>
                                            <td>Tahun</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{loadedData.tahun_terbit}</td>
                                        </tr>
                                        <tr>
                                            <td>ISBN</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{loadedData.isbn}</td>
                                        </tr>
                                        <tr>
                                            <td>Genre</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{loadedData.kategori.nama_kategori}</td>
                                        </tr>
                                        {stok && <tr>
                                            <td>Stok</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{stok?.stok>0?stok.stok:"Kosong"}</td>
                                            <td onClick={showHandler} style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>Edit Stok</td>
                                        </tr>}
                                        {
                                            !stok &&
                                            <tr>
                                                <td><button onClick={showHandler}>Buat Stok</button></td>
                                            </tr>
                                        }
                                    </table>
                                    <div className={classes['batchbut1']}>
                                        <button onClick={backHandler} className={classes['delbut']}>Back</button>
                                        <button onClick={editHandler} className={classes['savbut']} >Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </Box> );
                }
            }

        </Await>
    </Suspense>




    </>
  )
}


const loadAdminBook=async (id)=>{
    const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/buku/"+id);
    console.log(response);
    if(!response.ok)
    {
      throw json(
        { message: 'Could not fetch book detail.' },
        {
          status: 500,
        }
      );
    }
    else{
      const resData=await response.json();
      console.log(resData)
      return resData;
    }
  }

  const loadStocks=async(id)=>{
    const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/buku-perpus/"+id);
  
      const resData = await response.json();
      return resData;
    
  }

  export async function loader({ request, params }) {
    const id = params.bookId;
    const stok= await loadStocks(id)
    return defer({
      bookDetail: await loadAdminBook(id),
      stok:stok.data
    });
  }

  export async function action({ params, request }) {
   const method = request.method;
   console.log("fipefnpew")
   
   const data=await request.formData();
   console.log(data.get("id_buku"))
   let url="http://localhost:8080/admin-perpustakaan-methodist-cw/buku-perpus";
   if(method === "PUT")
    url="http://localhost:8080/admin-perpustakaan-methodist-cw/buku-perpus/"+data.get("id_buku");
    

    console.log(url)
    const response =await fetch(url,
        {
            method:method,
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer",
            },
            body:JSON.stringify(
                {
                    id_buku:data.get("id_buku"),
                    stok:data.get("stok")
                }
            )
        }

        )

    if(!response.ok)
    {
        throw json(
            { message: 'Could not execute API' },
        {
          status: 500,
        }
        )
    }

        return null
  }
  


/*   http://localhost:8080/admin-perpustakaan-methodist-cw/buku-perpus
 */