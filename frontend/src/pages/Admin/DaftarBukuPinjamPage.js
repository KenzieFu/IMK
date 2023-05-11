import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json,defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const DaftarBukuPinjamPage = () => {
    const [currentId,setCurrentId]=useState(null);
    const [showDeleteModal,setDeleteModal]=useState(false)
    const { daftarPinjam }=useLoaderData('admin-peminjaman');
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
            id:'id',
            name:"ID",
            selector:row=>row.id_peminjaman,
            
            sortable:true,
            
        },
        {
            id:"id_buku",
            name: 'Id Buku',
            selector: row => row.id_buku,
            accessor:"id_buku",
            sortable: true,
        },
        {
            id:"id_siswa",
            name: 'Id Siswa',
            selector: row => row.id_siswa,
            accessor:"id_siswa",
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
            name: 'Tanggal Kembali',
            selector: row => row.tanggal_kembali,
            accessor:"tanggal_kembali",
            sortable: true,
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
          <Await resolve={daftarPinjam} >
            {(loadedData)=>
               <DataTable
               title={
                <div style={{ display:"flex",justifyContent:"space-between" }}>
                    <h2>Tabel Peminjaman</h2>
                    <Link to="create">Create</Link>
                </div>
               }
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


const loadPinjams=async ()=>{
    const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman")
    console.log(response);
    if(!response.ok)
    {
      throw json(
        { message: 'Could not fetch peminjaman.' },
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
      daftarPinjam:loadPinjams()
    })
  }
  
  export async function action({ params, request }) {
    
    const method = request.method;
    const data = await request.formData();
    console.log(data);
    const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/' + data.get('id'), {
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
     return  redirect("/admin/borrowed-books");
  }
  
  
  
  
  
