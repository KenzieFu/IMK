import React, { Suspense, useState } from 'react'
import DataTable from 'react-data-table-component'



import { json,defer, Await, useLoaderData, useLocation, Link, Form, redirect, NavLink } from 'react-router-dom';



export const AbsensiPage = () => {
/*     const [currentId,setCurrentId]=useState(null);
    const [showDeleteModal,setDeleteModal]=useState(false) */
    const { absensi }=useLoaderData('petugas-absensi');
/*     const location = useLocation();
    const showModalHandler=(id)=>{
        setDeleteModal(true);
        setCurrentId(id);
      }
      const closeModalHandler=()=>{
        setDeleteModal(false);
        setCurrentId((prev)=>prev);

      } */


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
        {
          id:"button",
          name:"Action",
          width:"30%",
        cell: (row) =>
              (
           <>
               <div>
                {row.absensi.waktu_keluar !=null?<span>Selesai</span>:
                <Form method="PUT">
                  <input type="number" name='id_absensi' value={row.absensi.id_absensi}  />
                  <button type='submit'>Belum Selesai</button>
                </Form>

                }

               </div>
           </>
        ),

        ignoreRowClick: true,
        allowOverflow: true,
        selector:row=>row.button,
        button: true,
      },

    ];


  return (
    <>
    <NavLink to="/petugas">Home</NavLink>
    <Suspense fallback="">
          <Await resolve={absensi} >
            {(loadedData)=>
               <DataTable
               title={
                <div style={{ display:"flex",justifyContent:"space-between" }}>
                    <h2>Absensi (Belum Selesai)</h2>
                    <Link to="/petugas/absensi/create">Create</Link>
                </div>
               }
               data={loadedData.filter((item)=>item.absensi.waktu_keluar ===null?true:false)}
               columns={columns}
              pagination={loadedData.lenght!=0?true:false}
                   />
            }
          </Await>
        </Suspense>


        <Suspense fallback="">
          <Await resolve={absensi} >
            {(loadedData)=>
               <DataTable
               title={
                <div style={{ display:"flex",justifyContent:"space-between" }}>
                    <h2>Absensi</h2>

                </div>
               }
               data={loadedData}
               columns={columns}
              pagination={loadedData.lenght !=0?true:false}
                   />
            }
          </Await>
        </Suspense>

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

export async function action({ params, request }) {

  const method = request.method;
  const data = await request.formData();

  const time=new Date().toTimeString()

  const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/absensi-keluar-manual/'+data.get("id_absensi"), {
    method: method,
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer"
    },
    body:JSON.stringify({
      waktu_keluar:time
    })
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not update attendance.' },
      {
        status: 500,
      }
    );

  }
   return  response;
}






