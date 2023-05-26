import React, { Suspense, useEffect, useState } from "react";
import DataTable, { memoize } from "react-data-table-component";
import { DeleteModal } from "../../components/admin/modals/DeleteModal";
import { memo } from "react";
import { json, defer, Await, useLoaderData, redirect, useLocation, Link } from "react-router-dom";
import { set } from "react-hook-form";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import classes from './adminbatch.module.css'

export const StudentPage = () => {
  const [currentId, setCurrentId] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const { students } = useLoaderData("admin-siswa");
  const location = useLocation();
  console.log(currentId);

  const showModalHandler = (id) => {
    setDeleteModal(true);
    setCurrentId(id);
  };
  const closeModalHandler = () => {
    setDeleteModal(false);
    setCurrentId((prev) => prev);
  };

  // const columns = [
  //   {
  //     id: "id",
  //     name: <div className="data-row">ID Siswa</div>,
  //     selector: (row) => <div className="data-row">{row.id_siswa}</div>,
  //     sortable: true,
  //     headerStyle: {
  //       fontWeight: "bold",
  //       textAlign: "center",
  //       justifyContent: "center",
  //     },
  //     width: "10%",
  //   },
  //   {
  //     id: "nisn",
  //     name: <div className="data-row">NISN</div>,
  //     //selector: row => row.nisn,
  //     selector: (row) => <div className="data-row">{row.nisn}</div>,
  //     accessor: "nisn",
  //     sortable: true,
  //     headerStyle: {
  //       fontWeight: "bold",
  //       textAlign: "center",
  //       justifyContent: "center",
  //     },
  //   },
  //   {
  //     id: "nama_lengkap",
  //     name: <div className="data-row">Nama Lengkap</div>,
  //     //selector: row => row.nama_lengkap,
  //     selector: (row) => <div className="data-row">{row.nama_lengkap}</div>,
  //     accessor: "nama_lengkap",
  //     sortable: true,
  //     headerStyle: {
  //       fontWeight: "bold",
  //       textAlign: "center",
  //       justifyContent: "center",
  //     },
  //   },
  //   {
  //     id: "jenis_kelamin",
  //     name: <div className="data-row">Jenis Kelamin</div>,
  //     //selector: row => row.jenis_kelamin,
  //     selector: (row) => <div className="data-row">{row.jenis_kelamin}</div>,
  //     accessor: "jenis_kelamin",
  //     sortable: true,
  //     headerStyle: {
  //       fontWeight: "bold",
  //       textAlign: "center",
  //       justifyContent: "center",
  //     },
  //   },
  //   {
  //     id: "button",
  //     name: <div className="data-row">Aksi</div>,
  //     width: "30%",
  //     cell: (row) => (
  //       <div className="action-buttons">
  //         <Link to={`/admin/students/${row.id_siswa}`} className="action-detail">
  //           Rincian
  //         </Link>
  //         {"                    "}
  //         {"       "}
  //         <input type="hidden" id="row" />
  //         <span onClick={() => showModalHandler(row.id_siswa)} style={{ cursor: "pointer" }} className="action-delete">
  //           Hapus
  //         </span>
  //       </div>
  //     ),
  //     headerStyle: {
  //       fontWeight: "bold",
  //       textAlign: "center",
  //       justifyContent: "center",
  //       alignItems: "center",
  //     },

  //     ignoreRowClick: true,
  //     allowOverflow: true,
  //     selector: (row) => row.button,
  //     button: true,
  //   },
  // ];

      const columns = [
        {
            id:'id',
            name:<span className={classes['data-row']}>ID Siswa</span>,
            selector:(row) =>  <span className={classes['data-rowid']}>{row.id_siswa}</span>,
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
            name: <span className={classes['data-row']}>NISN</span>,
            //selector: row => row.nisn,
            selector:(row) =>  <span className={classes['data-row']}>{row.nisn}</span>,
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
            name:  <span className={classes['data-row']}>Nama Lengkap</span>,
            //selector: row => row.nama_lengkap,
            selector:(row) =>  <span className={classes['data-row']}>{row.nama_lengkap}</span>,
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
            name:  <span className={classes['data-row']}>Jenis Kelamin</span>,
            //selector: row => row.jenis_kelamin,
            selector:(row) =>  <span className={classes['data-row']}>{row.jenis_kelamin}</span>,
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
            name: <span className={classes['data-row']}>Aksi</span>,
            width:"30%",
          cell: (row) =>
                (
              <div className={classes["batchbut"]}>
            <Link to={`/admin/students/${row.id_siswa}`}  className={classes["detailbut"]}>
              Rincian &nbsp; <i class="fa fa-info-circle"></i></Link>{'                    '}{'       '}
            <input type="hidden" id='row' />
            <span  onClick={()=>showModalHandler(row.id_siswa)} className={classes["delbut"]}> 
            Hapus  &nbsp; <i class="fa fa-minus-circle" aria-hidden="true"></i> </span>
                  
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
      <div className={classes["search-button"]}>
        <Input type="text" placeholder="Cari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={classes["searchbox"]} />
        <Button onClick={() => setAdvanceSearch(!advanceSearch)} className={classes["action-filter"]}>
          {" "}
          Filter <i class="fa fa-filter" aria-hidden="true"></i>
        </Button>
      </div>
      {advanceSearch && (
        <>
          <div className={classes["downdown"]}>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret className={classes["dropdown2"]}>
                Filter by <i class="fa fa-filter" aria-hidden="true"></i>
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
          </div>
        </>
      )}
      <Suspense fallback="">
        <Await resolve={students}>
          {(loadedData) => (
            <DataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1vw" }}>
                  <h1 className={classes["judul1"]}>Tabel Siswa</h1>
                  <Link to="registrasi/data-pribadi" className={classes["buttoncreate"]}>
                    <i class="bi bi-person-plus"> Tambah Siswa</i>
                  </Link>
                </div>
              }
              data={loadedData.filter((item) => {
                const keyword=searchTerm.toLowerCase();
                  return(
                    String(item.id).includes(keyword) ||
                    String(item.nisn).includes(keyword) ||
                    item.nama_lengkap.toLowerCase().includes(keyword)||
                    item.jenis_kelamin.toLowerCase().includes(keyword)
                  )
              })}
              columns={columns}
              pagination
            />
          )}
        </Await>
      </Suspense>
      {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler} />}
      {location.state && <div>{location.state.message}</div>}
    </>
  );
};

const loadStudents = async () => {
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/siswa");
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch student." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
};

export const loader = () => {
  return defer({
    students: loadStudents(),
  });
};

export async function action({ params, request }) {
  const method = request.method;
  const data = await request.formData();
  console.log(data);
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/siswa/" + data.get("id"), {
    method: method,
    headers: {
      Authorization: "Bearer",
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete student." },
      {
        status: 500,
      }
    );
  }
  return redirect("/admin/students");
}
