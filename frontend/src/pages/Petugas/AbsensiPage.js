import React, { Suspense, useState } from 'react'
import DataTable from 'react-data-table-component'


import { json,defer, Await, useLoaderData, useLocation, Link, Form, redirect, NavLink } from 'react-router-dom';
import classes from './AbsensiPage.module.css'


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
          id: "id",
          name: <span className={classes["data-row"]}>ID</span>,
          selector: (row) => <span className={classes["data-row"]}>{row.absensi.id_absensi}</span>,
          sortable: true,
        },
        {
          id: "nisn",
          name: <span className={classes["data-row"]}>NISN</span>,
          selector: (row) => <span className={classes["data-row"]}>{row.absensi.nisn}</span>,
          accessor: "nisn",
          sortable: true,
        },
        {
          id: "tanggal",
          name: <span className={classes["data-row"]}>Tanggal</span>,
          selector: (row) => <span className={classes["data-row"]}>{row.absensi.tanggal}</span>,
          accessor: "tanggal",
          sortable: true,
        },
        {
          id: "waktu_masuk",
          name: <span className={classes["data-row"]}>Waktu Masuk</span>,
          selector: (row) => <span className={classes["data-row"]}>{row.absensi.waktu_masuk}</span>,
          accessor: "waktu_masuk",
          sortable: true,
        },
        {
          id: "waktu_keluar",
          name: <span className={classes["data-row"]}>Waktu Keluar</span>,
          selector: (row) => <span className={classes["data-row"]}>{row.absensi.waktu_keluar}</span>,
          accessor: "waktu_keluar",
          sortable: true,
        },
        {
          id: "button",
          name: <span className={classes["data-row"]}>Aksi</span>,
          width: "30%",
          cell: (row) => (
            <>
              <div>
                {row.absensi.waktu_keluar != null ? (
                  <span className={classes["data-row"]}>Selesai</span>
                ) : (
                  <Form method="PUT">
                    {/* <input type="number" name="id_absensi" value={row.absensi.id_absensi} /> */}
                    {/* hidden */}
                    <input type="hidden" name="id_absensi" value={row.absensi.id_absensi} />
                    <button type="submit">Belum Selesai</button>
                  </Form>
                )}
              </div>
            </>
          ),

          ignoreRowClick: true,
          allowOverflow: true,
          selector: (row) => row.button,
          button: true,
        },
      ];


  return (
    <>
    <NavLink to="/petugas">Home</NavLink>
      <Suspense fallback="">
        <Await resolve={absensi}>
          {(loadedData) => (
            <DataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1vw" }}>
                  <h1 className={classes["judul1"]}>Absensi Belum Selesai</h1>
                  <Link to="/petugas/absensi/create" className={classes["buttoncreate"]}>
                    <i class="bi bi-plus"></i>
                  </Link>
                </div>
              }
              // title={
              //   <div style={{ display: "flex", justifyContent: "space-between" }}>
              //     <h2></h2>
              //     <Link to="">Create</Link>
              //   </div>
              // }
              data={loadedData.filter((item) => (item.absensi.waktu_keluar === null ? true : false))}
              columns={columns}
              pagination={loadedData.lenght != 0 ? true : false}
            />
          )}
        </Await>
      </Suspense>

      <Suspense fallback="">
        <Await resolve={absensi}>
          {(loadedData) => (
            <DataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1vw" }}>
                  <h1 className={classes["judul1"]}>Absensi Selesai</h1>
                </div>
              }
              // title={
              //   <div style={{ display: "flex", justifyContent: "space-between" }}>
              //     <h2>Absensi</h2>
              //   </div>
              // }
              // data={loadedData}
              data={loadedData.filter((item) => (item.absensi.waktu_keluar !== null ? true : false))}
              columns={columns}
              pagination={loadedData.lenght != 0 ? true : false}
            />
          )}
        </Await>
      </Suspense>
    </>
  );
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






