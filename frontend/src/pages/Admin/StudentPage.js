import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json,defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import "./StudentPage.css";

export const StudentPage = () => {
    const [currentId,setCurrentId]=useState(null);
    const [showDeleteModal,setDeleteModal]=useState(false)
    const { students }=useLoaderData('admin-siswa');
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
            name:<div className="data-row">ID Siswa</div>,
            selector:(row) =>  <div className="data-row">{row.id_siswa}</div>,
            sortable:true,
            headerStyle: {
              fontWeight: "bold",
              textAlign: "center",
              justifyContent: "center",
            },
            width: "10%",
        },
        {
            id:"nisn",
            name: <div className="data-row">NISN</div>,
            //selector: row => row.nisn,
            selector:(row) =>  <div className="data-row">{row.nisn}</div>,
            accessor:"nisn",
            sortable: true,
            headerStyle: {
              fontWeight: "bold",
              textAlign: "center",
              justifyContent: "center",
            },
        },
        {
            id:"nama_lengkap",
            name:  <div className="data-row">Nama Lengkap</div>,
            //selector: row => row.nama_lengkap,
            selector:(row) =>  <div className="data-row">{row.nama_lengkap}</div>,
            accessor:"nama_lengkap",
            sortable: true,
            headerStyle: {
              fontWeight: "bold",
              textAlign: "center",
              justifyContent: "center",
            },
        },
        {
            id:"jenis_kelamin",
            name:  <div className="data-row">Jenis Kelamin</div>,
            //selector: row => row.jenis_kelamin,
            selector:(row) =>  <div className="data-row">{row.jenis_kelamin}</div>,
            accessor:"jenis_kelamin",
            sortable: true,
            headerStyle: {
              fontWeight: "bold",
              textAlign: "center",
              justifyContent: "center",
            },
        },
        {
            id:"button",
            name: <div className="data-row">Aksi</div>,
            width:"30%",
          cell: (row) =>
                (
              <div className="action-buttons" >
            <Link to={`/admin/students/${row.id_siswa}`}  className="action-detail">Rincian</Link>{'                    '}{'       '}
            <input type="hidden" id='row' />
            <span  onClick={()=>showModalHandler(row.id_siswa)} style={{ cursor:"pointer" }} className="action-delete">Hapus</span>
                  
            </div>
          ),
          headerStyle: {
            fontWeight: "bold",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          },

          ignoreRowClick: true,
          allowOverflow: true,
          selector:row=>row.button,
          button: true,
        },
    ];

    const [advanceSearch, setAdvanceSearch] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchBased, setSearchBased] = React.useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => {
      setDropdownOpen(!dropdownOpen);
    };

  return (
    <>
     <Button onClick={() => setAdvanceSearch(!advanceSearch)} className="action-filter">
            {" "}
            Pencarian Lebih Lanjut
          </Button>
    {
      advanceSearch && (
        <>
         <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret className="dropdown-toggle-search">
              Cari Data berdasarkan :
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => setSearchBased("nisn")} className="box-menu">
                NISN
              </DropdownItem>
              <DropdownItem onClick={() => setSearchBased("Nama")} className="box-menu">
                Nama
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Input disabled={searchBased === "" ? true : false}
          type="text"
          placeholder={searchBased === "nisn" ? "Cari data dari NISN..." : searchBased === "nama" ? "Cari Data dari nama siswa..." : "Cari data..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          />
        </>
      )
    }
        <Suspense fallback="">
          <Await resolve={students} >
            {(loadedData)=>
               <DataTable
               title={
                <div style={{ display:"flex",justifyContent:"space-between" }}>
                    <h2 className="data-table-header">Tabel Siswa</h2>
                    <Link to="registrasi/data-pribadi" style={{listStyle: 'none'}} className="button-create"><i class="bi bi-person-plus"> Tambah Siswa</i></Link>
                </div>
               }
               data={loadedData.filter((item)=> {
                if(searchBased === ""){
                  return item
                }
                else if(searchBased === "Nama"){
                  return item.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase())
                } else if(searchBased === "nisn"){
                  return item.nisn.toString().toLowerCase().includes(searchTerm.toLowerCase())
                }
               })}
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


const loadStudents=async ()=>{
    const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/siswa")
    console.log(response);
    if(!response.ok)
    {
      throw json(
        { message: 'Could not fetch student.' },
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
      students:loadStudents()
    })
  }

  export async function action({ params, request }) {

    const method = request.method;
    const data = await request.formData();
    console.log(data);
    const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/siswa/' + data.get('id'), {
      method: method,
      headers:{
        "Authorization":"Bearer"
      }
    });

    if (!response.ok) {
      throw json(
        { message: 'Could not delete student.' },
        {
          status: 500,
        }
      );

    }
     return  redirect("/admin/students");
  }





