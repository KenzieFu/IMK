import React, { Suspense, useState } from 'react'
import DataTable from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';

import { json,defer, Await, useLoaderData, useLocation, Link } from 'react-router-dom';


export const AbsensiPage = () => {
    const [currentId,setCurrentId]=useState(null);
    const [showDeleteModal,setDeleteModal]=useState(false)
    const { absensi }=useLoaderData('petugas-absensi');
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
            selector:row=>row.absensi.id_absensi,

            sortable:true,

        },
        {
            id:"nisn",
            name: 'NISN',
            selector: row => row.absensi.nisn,
            accessor:"nisn",
            sortable: true,
        },
        {
            id:"tanggal",
            name: 'Tanggal',
            selector: row => row.absensi.tanggal,
            accessor:"tanggal",
            sortable: true,
        },
        {
            id:"waktu_masuk",
            name: 'Waktu Masuk',
            selector: row => row.absensi.waktu_masuk,
            accessor:"waktu_masuk",
            sortable: true,
        },
        {
            id:"waktu_keluar",
            name: 'Waktu Keluar',
            selector: row => row.absensi.waktu_keluar,
            accessor:"waktu_keluar",
            sortable: true,
        },
        
    ];


  return (
    <>
        <Suspense fallback="">
          <Await resolve={absensi} >
            {(loadedData)=>
               <DataTable
               title={
                <div style={{ display:"flex",justifyContent:"space-between" }}>
                    <h2>Tabel Siswa</h2>
                    <Link to="registrasi/data-pribadi">Create</Link>
                </div>
               }
               data={loadedData}
               columns={columns}
              pagination={loadedData.lenght}
                   />
            }
          </Await>
        </Suspense>
        {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler}/>}
        {location.state && <div>{location.state.message}</div>}
    </>
  )
}

const loaderAbsensi=async()=>{

    const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/absensi")
    console.log(response);
    if(!response.ok)
    {
      
      throw json(
        { message: 'Could not fetch absensi.' },
        {
          status: 500,
        }
      );
    }
    
     
      const resData=await response.json();
    console.log(resData)
      return resData
  
}

export const loader=()=>{
    return defer({
        absensi:loaderAbsensi()
    })
}






