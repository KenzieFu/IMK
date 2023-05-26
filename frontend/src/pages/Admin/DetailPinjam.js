import React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '../../UI/Box'
import { Await, useRouteLoaderData, useNavigate } from 'react-router-dom'
import { json,defer } from 'react-router-dom'
import { Suspense } from 'react'
import classes from './adminbatch.module.css';


export const DetailPinjam = () => {
  const { pinjamDetail }= useRouteLoaderData("admin-detail-pinjam");
  const navigate= useNavigate();

  const backHandler=()=>{
      navigate("..");
  }
  const editHandler=()=>{
      navigate(`/admin/borrowed-books/${pinjamDetail.id_pinjam}/edit`)
  }
  return (
    <>
     <Suspense>
        <Await resolve={pinjamDetail}>
            {(loadedData)=>
                {
                    return(
                <Box>

        <div className={classes.content}>
                <div className={classes.cardtopmain}>
                    <div className={classes.cardtop}>
                        <div className={classes.card}>
                            <h1 hidden>{loadedData.id_pinjam}</h1>
                            <div className={classes.cover}>
                                <img src={`http://localhost:8080${loadedData.buku.gambar_buku}`}></img>
                            </div>

                            <div className={classes.book_info}>
                                <h2>{loadedData.buku.judul_buku}</h2>
                                <div className={classes.infotable}>
                                    <table>
                                        <tr>
                                            <td style={{width: "20vw"}}>Nama Siswa</td>
                                            <td style={{ width: "5vw" }}>:</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{loadedData.siswa.nama_lengkap}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "20vw"}}>ISBN</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{loadedData.buku.isbn}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "20vw"}}>Tanggal Peminjaman</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{loadedData.tanggal_pinjam}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width: "20vw"}}>Tanggal Pengembalian</td>
                                            <td style={{ width: "5vw" }}>: &nbsp;</td>
                                            <td style={{ color: "#3a3a3a", fontWeight: "500", width: "20vw" }}>{loadedData.tanggal_kembali}</td>
                                        </tr>
                                    </table>
                                    <div className={classes['batchbut1']}>
                                        <button onClick={backHandler} className={classes['delbut']}>Back</button>
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


const loadAdminPinjam=async (id)=>{
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/"+id);
  console.log(response);
  if(!response.ok)
  {
    throw json(
      { message: 'Could not fetch pinjam detail.' },
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
  const id = params.pinjamId;

  return defer({
    pinjamDetail: await loadAdminPinjam(id),
  });
}

