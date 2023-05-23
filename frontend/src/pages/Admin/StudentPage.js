import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json,defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import "./UserPage.css";

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
            name:"ID",
            selector:row=>row.id_siswa,

            sortable:true,

        },
        {
            id:"nisn",
            name: 'NISN',
            selector: row => row.nisn,
            accessor:"nisn",
            sortable: true,
        },
        {
            id:"nama_lengkap",
            name: 'Nama Lengkap',
            selector: row => row.nama_lengkap,
            accessor:"nama_lengkap",
            sortable: true,
        },
        {
            id:"jenis_kelamin",
            name: 'Jenis Kelamin',
            selector: row => row.jenis_kelamin,
            accessor:"jenis_kelamin",
            sortable: true,
        },
        {
            id:"button",
            name:"Action",
            width:"30%",
          cell: (row) =>
                (
              <div style={{ margin:"0 0" }} >
            <Link to={`/admin/students/${row.id_siswa}`} style={{ cursor:"pointer" ,textDecoration:"none",color:"gray" }}>Detail</Link>{'                    '}{'       '}
            <input type="hidden" id='row' />
            <span  onClick={()=>showModalHandler(row.id_siswa)} style={{ cursor:"pointer" }}>Delete</span>

            </div>
          ),

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
                    <h2>Tabel Siswa</h2>
                    <Link to="registrasi/data-pribadi">Create</Link>
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





