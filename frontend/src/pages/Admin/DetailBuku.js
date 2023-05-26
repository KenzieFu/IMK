import React from 'react'
import { Box } from '../../UI/Box'
import { Await, useRouteLoaderData, useNavigate } from 'react-router-dom'
import { json,defer } from 'react-router-dom'
import { Suspense } from 'react'

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

                <div className='acc-info'>
                    <h1 hidden>Detail Buku ({loadedData.id_buku})</h1>
                    <table>
                        <tr>
                            <td>Judul Buku</td>
                            <td>:</td>
                            <td>{loadedData.judul_buku}</td>
                        </tr>
                        <tr>
                            <td>Pengarang</td>
                            <td>:</td>
                            <td>{loadedData.pengarang}</td>
                        </tr>
                        <tr>
                            <td>Penerbit</td>
                            <td>:</td>
                            <td>{loadedData.penerbit}</td>
                        </tr>
                        <tr>
                            <td>Tahun Terbit</td>
                            <td>:</td>
                            <td>{loadedData.tahun_terbit}</td>
                        </tr>
                        <tr>
                            <td>Kategori Buku</td>
                            <td>:</td>
                            <td>{loadedData.kategori.nama_kategori}</td>
                        </tr>
                        <tr>
                            <td>ISBN</td>
                            <td>:</td>
                            <td>{loadedData.isbn}</td>
                        </tr>
                        <tr>
                            <td>Sinopsis</td>
                            <td>:</td>
                            <td>{loadedData.sinopsis}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td> <img src={`http://localhost:8080${loadedData.gambar_buku}`} /></td>
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
