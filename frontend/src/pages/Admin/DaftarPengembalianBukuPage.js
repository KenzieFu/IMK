import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json,defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const DaftarPengembalianBukuPage = () => {
    const [currentId,setCurrentId]=useState(null);
    const [showDeleteModal,setDeleteModal]=useState(false)
    const { daftarPengembalian }=useLoaderData('admin-pengembalian');
    const location = useLocation();
    console.log(currentId);

    const showModalHandler=(id)=>{
        setDeleteModal(true);
        setCurrentId(id);
      }
      const closeModalHandler=()=>{
        setDeleteModal(false);
        setCurrentId((prev)=>prev);
      }

      const columns = [

        {
          id:"nama_siswa",
          name: 'Nama Siswa',
          selector: row => row.siswa.nama_lengkap,
          accessor:"nama_siswa",
          sortable: true,
      },
        {
            id:"judul_buku",
            name: 'Judul Buku',
            selector: row => row.buku.judul_buku,
            accessor:"judul_buku",
            sortable: true,
        },
        {
          id:"tanggal_pinjam",
          name: 'Tanggal Pinjam',
          selector: row => row.tanggal_pinjam,
          accessor:"tanggal_pinjam",
          sortable: true,
      },
      {
        id:"tanggal_kembali",
        name: 'Tanggal Dikembalikan',
        selector: row => row.tanggal_kembali,
        accessor:"tanggal_kembali",
        sortable: true,
    },
        {
            id:"tanggal_pengembalian",
            name: 'Tanggal Pengembalian',
            selector: row => row.tanggal_pengembalian,
            accessor:"tanggal_pengembalian",
            sortable: true,
        },
        {
            id:"status_kembali",
            name: 'Status',
            selector: row => row.status_kembali,
            accessor:"status_kembali",
            sortable: true,
            color: (row => row.status_kembali === "Tepat Waktu") ? "Green" : "Red"
        },
        {
            id:"button",
            name:"Action",
            width:"30%",
          cell: (row) =>
                (
              <div style={{ margin:"0 0" }} >
            <Link to={`/admin/borrowed-books/${row.id_peminjaman}`} style={{ cursor:"pointer" ,textDecoration:"none",color:"gray" }}>Detail</Link>{'                    '}{'       '}
            <input type="hidden" id='row' />
            <span  onClick={()=>showModalHandler(row.id_peminjaman)} style={{ cursor:"pointer" }}>Delete</span>

            </div>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          selector:row=>row.button,
          button: true,
        },
    ];

  return (
    <>
        <Suspense fallback="">
          <Await resolve={daftarPengembalian} >
            {(loadedData)=>
               <DataTable
               title="Tabel Pengembalian"
               data={loadedData}
               columns={columns}
               pagination
                   />
            }
          </Await>
        </Suspense>
        {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler}/>}
        {location.state && <div>{location.state.message}</div>}
    </>
  )
}


const loadKembali=async ()=>{
    const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/pengembalian")
    console.log(response);
    if(!response.ok)
    {
      throw json(
        { message: 'Could not fetch pengembalian.' },
        {
          status: 500,
        }
      );
    }
    else{
      const resData=await response.json();
      return resData;
    }
  }

  export const loader=()=>{
    return defer({
      daftarPengembalian:loadKembali()
    })
  }

  export async function action({ params, request }) {

    const method = request.method;
    const data = await request.formData();
    console.log(data);
    const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/pengembalian/' + data.get('id'), {
      method: method,
      headers:{
        "Authorization":"Bearer"
      }
    });

    if (!response.ok) {
      throw json(
        { message: 'Could not delete this row.' },
        {
          status: 500,
        }
      );

    }
     return  redirect("/admin/returned-books");
  }





