import React from 'react'
import { Box } from '../../UI/Box'
import { Await, useRouteLoaderData, useNavigate } from 'react-router-dom'
import { json,defer } from 'react-router-dom'
import { Suspense } from 'react'
import classes from './adminbatch.module.css';

export const DetailBuku = () => {
    const { bookDetail }= useRouteLoaderData("admin-detail-buku");
    const navigate= useNavigate();

    const backHandler=()=>{
        navigate("..");
    }
    const editHandler=()=>{
        navigate(`/admin/books/${bookDetail.id_buku}/edit`)
    }
  return (
    <>
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

  export async function loader({ request, params }) {
    const id = params.bookId;

    return defer({
      bookDetail: await loadAdminBook(id),
    });
  }
