
import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json,defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classes from '../adminbatch.module.css'

export const LogPemesanan = () => {


    const { books }=useLoaderData('admin-log-pemesanan-buku');
    const location = useLocation();


    const columns = [
      {
        id: 'id',
        name: <div className={classes['data-row']}>ID  Pemesanan</div>,
        selector: row => <div className={classes['data-rowid']}>{row.id}</div>,
        sortable: true,
        headerStyle: {
          fontWeight: "bold",
          textAlign: "center",
          justifyContent: "center",
        },
        width: "7%"


      },
      {
        id: "riwayat",
        name: <div className={classes['data-row']}>Riwayat</div>,
        selector: row => <div className={classes['data-row']}>{row.riwayat_pemesanan_buku}</div>,
        accessor: "riwayat",
        sortable: true,
        headerStyle: {
          fontWeight: "bold",
          textAlign: "center",
          justifyContent: "center",
        },

      },

    ];


    return (
        <>
            <Suspense fallback="">
              <Await resolve={books} >
                {(loadedData)=>
                   <DataTable
                   title={
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1vw" }}>
                    <h1 className={classes["judul1"]}>Tabel Log Buku</h1>
                  </div>
                   }
                   data={loadedData}
                   columns={columns}
                   pagination
                       />
                }
              </Await>
            </Suspense>
            {/* {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler}/>} */}
            {location.state && <div>{location.state.message}</div>}
        </>
      )
}


const loadLogBooks=async ()=>{

    const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/log-pemesanan-buku")
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
      const logBuku = resData.data
      return logBuku;
    }
  }



export const loader=()=>{
        return defer({
          books:loadLogBooks()
        })
}






