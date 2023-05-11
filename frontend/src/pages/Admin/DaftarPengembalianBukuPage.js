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
    const { daftarPinjam }=useLoaderData('admin-pengembalian');
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
            selector:row=>row.id_pengembalian,
            
            sortable:true,
            
        },
        {
            id:"id_peminjaman",
            name: 'Id Peminjaman',
            selector: row => row.id_peminjaman,
            accessor:"id_peminjaman",
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
            id:"status",
            name: 'Status',
            selector: row => row.status,
            accessor:"status",
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
               title="Tabel User"
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
      daftarPengembalian:loadPinjams()
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
     return  redirect("/admin/returned-books");
  }
  
  
  
  
  
