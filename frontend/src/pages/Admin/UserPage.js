
import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json,defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";





export const UserPage = () => {
  const [currentId,setCurrentId]=useState(null);
  const [showDeleteModal,setDeleteModal]=useState(false)
  const { akuns }=useLoaderData('admin-akun');
  const location = useLocation();
  console.log(currentId);

  const [advanceSearch, setAdvanceSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBased, setSearchBased] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
   const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggleDropdown2 = () => {
   setDropdownOpen2(!dropdownOpen2);
 };

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
    <Input
type="text"
placeholder="Cari Username..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
/>
     <Button onClick={() => setAdvanceSearch(!advanceSearch)}>
        Pencarian Lebih Lanjut
      </Button>
     {
        advanceSearch &&
        <>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle caret>
          Tampilkan data berdasarkan:
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem  onClick={() => setSearchBased('')}>
            Tampilkan semua data
          </DropdownItem>
          <DropdownItem divider />
    <DropdownItem header>Hak Akses</DropdownItem>
          <DropdownItem  onClick={() => setSearchBased('siswa')}>
            Siswa
          </DropdownItem>
          <DropdownItem  onClick={() => setSearchBased('admin')}>
            Admin
          </DropdownItem>
          <DropdownItem  onClick={() => setSearchBased('petugas')}>
            Petugas
          </DropdownItem>
          <DropdownItem  onClick={() => setSearchBased('kasir')}>
            Kasir
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div>
</div>
      </>
}

        <Suspense fallback="">
          <Await resolve={akuns} >
            {(loadedData)=>
               <DataTable
               title="Tabel User"
               data={loadedData.filter((item) => {
                if(searchBased === ""){
                  return item.username.toLowerCase().includes(searchTerm.toLowerCase());
                } else if (searchBased === "siswa" && item.hak_akses.toLowerCase() === "siswa") {
                  return item.username.toLowerCase().includes(searchTerm.toLowerCase());
                } else if (searchBased === "admin" && item.hak_akses.toLowerCase() === "admin") {
                  return item.username.toLowerCase().includes(searchTerm.toLowerCase());
                } else if (searchBased === "petugas" && item.hak_akses.toLowerCase() === "petugas") {
                  return item.username.toLowerCase().includes(searchTerm.toLowerCase());
                } else if (searchBased === "kasir" && item.hak_akses.toLowerCase() === "kasir") {
                  return item.username.toLowerCase().includes(searchTerm.toLowerCase());
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




