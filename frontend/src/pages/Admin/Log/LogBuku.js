
import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json,defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const BookTablePage = () => {

    const [currentId,setCurrentId]=useState(null);
    const [showDeleteModal,setDeleteModal]=useState(false)
    const { books }=useLoaderData('admin-buku');
    const location = useLocation();
  
  
  
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
        selector:row=>row.id_buku,
        
        sortable:true,
        
    },
    {
        id:"judul_buku",
        name: 'Judul Buku',
        selector: row => row.judul_buku,
        accessor:"judul_buku",
        sortable: true,
    },
    {
        id:"pengarang",
        name: 'Pengarang',
        selector: row => row.pengarang,
        accessor:"pengarang",
        sortable: true,
    },
    {
        id:"kategori",
        accessor:"kategori.nama_kategori",
        name: 'Kategori',
        selector: row => row.kategori.nama_kategori,
        sortable: true,
    },
    {
        id:"button",
        name:"Action",
        width:"30%",
      cell: (row) => 
            (
          <div style={{ margin:"0 0" }} >
        <Link to={`/admin/books/${row.id_buku}`} style={{ cursor:"pointer" ,textDecoration:"none",color:"gray" }}>Detail</Link>{'                    '}{'       '}
        <input type="hidden" id='row' />
        <span  onClick={()=>showModalHandler(row.id_buku)} style={{ cursor:"pointer" }}>Delete</span>
       
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
              <Await resolve={books} >
                {(loadedData)=>
                   <DataTable
                   title={
                    <div style={{ display:"flex",justifyContent:"space-between" }}>
                        <h2>Tabel Buku</h2>
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


const loadBooks=async ()=>{
 
    const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/buku")
    console.log(response);
    if(!response.ok)
    {
      throw json(
        { message: 'Could not fetch books.' },
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
          books:loadBooks()
        }) 
}

export async function action({ params, request }) {
  
    const method = request.method;
    const data = await request.formData();
    console.log(data);
    const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/buku/' + data.get('id'), {
      method: method,
      headers:{
        "Authorization":"Bearer"
      }
    });
  
    if (!response.ok) {
      throw json(
        { message: 'Could not delete book.' },
        {
          status: 500,
        }
      );
    
    }
     return  redirect("/admin/books");
  }
  


