
import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json,defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';






export const UserPage = () => {
  const [currentId,setCurrentId]=useState(null);
  const [showDeleteModal,setDeleteModal]=useState(false)
  const { akuns }=useLoaderData('admin-akun');
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
        selector:row=>row.id_akun,
        
        sortable:true,
        
    },
    {
        id:"username",
        name: 'Username',
        selector: row => row.username,
        accessor:"username",
        sortable: true,
    },
    {
        id:"tipe",
        accessor:"accessor",
        name: 'Hak Akses',
        selector: row => row.hak_akses,
        sortable: true,
    },
    {
        id:"button",
        name:"Action",
        width:"30%",
      cell: (row) => 
            (
          <div style={{ margin:"0 0" }} >
        <Link to={`/admin/user/${row.id_akun}`} style={{ cursor:"pointer" ,textDecoration:"none",color:"gray" }}>Detail</Link>{'                    '}{'       '}
        <input type="hidden" id='row' />
        <span  onClick={()=>showModalHandler(row.id_akun)} style={{ cursor:"pointer" }}>Delete</span>
       
        </div>
      ),
      
      ignoreRowClick: true,
      allowOverflow: true,
      selector:row=>row.button,
      button: true,
    },
];
    /* const [data,setData]=useState(DUMMY_USER);


    const deleteHandler=(id,e)=>{
        e.preventDefault();
      
        const updatedData=data.filter(item=>item.id !== id);
        console.log("deleted" );
        setData(updatedData);
    } */
  return (
    <>
        <Suspense fallback="">
          <Await resolve={akuns} >
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



const loadAkuns=async ()=>{
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/akun")
  console.log(response);
  if(!response.ok)
  {
    throw json(
      { message: 'Could not fetch akun.' },
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
    akuns:loadAkuns()
  })
}

export async function action({ params, request }) {
  
  const method = request.method;
  const data = await request.formData();
  console.log(data);
  const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/akun/' + data.get('id'), {
    method: method,
    headers:{
      "Authorization":"Bearer"
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete user.' },
      {
        status: 500,
      }
    );
  
  }
   return  redirect("/admin/user");
}




