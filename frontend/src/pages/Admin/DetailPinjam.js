import React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '../../UI/Box'
import { Await, useRouteLoaderData, useNavigate } from 'react-router-dom'
import { json,defer } from 'react-router-dom'
import { Suspense } from 'react'
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

                <div className='acc-info'>
                    <h1 hidden>Detail Pinjam ({loadedData.id_pinjam})</h1>
                    <table>
                    <tr>
                            <td>Nama Siswa</td>
                            <td>:</td>
                            <td>{loadedData.siswa.nama_lengkap}</td>
                        </tr>
                        <tr>
                            <td>Judul Buku</td>
                            <td>:</td>
                            <td>{loadedData.buku.judul_buku}</td>
                        </tr>
                        <tr>
                            <td>ISBN</td>
                            <td>:</td>
                            <td>{loadedData.buku.isbn}</td>
                        </tr>
                        <tr>
                            <td>Tanggal Pinjam</td>
                            <td>:</td>
                            <td>{loadedData.tanggal_pinjam}</td>
                        </tr>
                        <tr>
                            <td>Tanggal Pengembalian</td>
                            <td>:</td>
                            <td>{loadedData.tanggal_kembali}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td> <img src="../assets/book.png" /></td>
                        </tr>


                    </table>

                    <div>
                        <button onClick={backHandler}>Back</button>
                        <button onClick={editHandler} >Edit</button>
                    </div>
                </div>
            </Box> );
                }
            }

        </Await>
    </Suspense>


         <div>DetailPinjam</div>
        <Link to="..">Back</Link>
         <Link to="edit">Edit</Link>
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

