import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json, defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const DaftarBookingBuku = () => {
  const [currentId, setCurrentId] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(false)
  const { daftarBooking } = useLoaderData('admin-booking');
  const location = useLocation();
  console.log(currentId);

  const showModalHandler = (id) => {
    setDeleteModal(true);
    setCurrentId(id);
  }
  const closeModalHandler = () => {
    setDeleteModal(false);
    setCurrentId((prev) => prev);

  }

  const [advanceSearch, setAdvanceSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBased, setSearchBased] = React.useState("");
  const [searchBasedDate, setSearchBasedDate] = React.useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const columns = [
    {
      id: 'id',
      name: <div className="data-row">ID Pemesanan</div>,
      selector: row => <div className="data-row">{row.id_pemesanan}</div>,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
    },
    {
      id: "nama_siswa",
      name: <div className="data-row">Nama Siswa</div>,
      selector: row => <div className="data-row">{row.siswa.nama_lengkap}</div>,
      accessor: "nama_siswa",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
    },
    {
      id: "judul_buku",
      name: <div className="data-row">Judul Buku</div>,
      selector: row => <div className="data-row">{row.buku.judul_buku}</div>,
      accessor: "judul_buku",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
    },
    {
        id: "waktu",
        name: <div className="data-row">Waktu</div>,
        selector: row => <div className="data-row">{row.waktu}</div>,
        accessor: "waktu",
        sortable: true,
        headerStyle: {
          fontWeight: "bold",
          textAlign: "center",
          justifyContent: "center",
        },
      },
      {
        id: "tanggal",
        name: <div className="data-row">Tanggal</div>,
        selector: row => <div className="data-row">{row.tanggal}</div>,
        accessor: "tanggal",
        sortable: true,
        headerStyle: {
          fontWeight: "bold",
          textAlign: "center",
          justifyContent: "center",
        },
      },

    // {
    //   id: "judul_buku",
    //   name: 'Judul Buku',
    //   selector: row => row.buku.judul_buku,
    //   accessor: "judul_buku",
    //   sortable: true,
    // },


    {
      id: "button",
      name: <div className="data-row">Aksi</div>,
      width: "30%",
      cell: (row) =>
      (
        <div style={{ margin: "0 0" }} className='action-buttons'>
          {/* <Link to={`/admin/booked-books/${row.id_pemesanan}`} style={{ cursor: "pointer", textDecoration: "none", color: "gray" }}>Detail</Link>{'                    '}{'       '}
          <input type="hidden" id='row' /> */}
          <span onClick={() => showModalHandler(row.id_pemesanan)} style={{ cursor: "pointer" }} className='action-check'> <i class="bi bi-check-lg"> Setujui</i></span>

        </div>
      ),
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      ignoreRowClick: true,
      allowOverflow: true,
      selector: row => row.button,
      button: true,
    },
  ];


  return (
    <>
      <Button onClick={() => setAdvanceSearch(!advanceSearch)}>
        Pencarian Lebih Lanjut
      </Button>
      {
        advanceSearch &&
        <>
       <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret className="dropdown-toggle-search">
              Cari Data berdasarkan :
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem onClick={() => {setSearchBased(""); setSearchTerm("")}} className="box-menu">
               Tampilkan Semua Data
              </DropdownItem>
              <DropdownItem onClick={() => setSearchBased("nama")} className="box-menu">
                Nama Siswa
              </DropdownItem>
              <DropdownItem onClick={() => setSearchBased("judul")} className="box-menu">
                Judul Buku
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Input disabled={searchBased === "" ? true : false}
            type="text"
            placeholder={searchBased === "nama" ? "Cari data dari nama siswa..." : searchBased === "judul" ? "Cari Data dari judul buku..." : "Cari data..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

      </>

      }
      <Suspense fallback="">
        <Await resolve={daftarBooking} >
          {(loadedData) =>
            <DataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h2 className='data-table-header'>Tabel Booking</h2>
                  <Link to="create" className="button-create"><i class="bi bi-person-plus"> Tambah Siswa</i></Link>
                </div>
              }
              data={loadedData.filter((item)=> {
                if(searchBased === ""){
                  return item
                }
                else if(searchBased === "nama"){
                  return item.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase())
                } else if(searchBased === "judul"){
                  return item.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase())
                }
               })}
              columns={columns}
              pagination
            />
          }
        </Await>
      </Suspense>
      {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler} />}
      {location.state && <div>{location.state.message}</div>}
    </>
  )
}


const loadBooking = async () => {
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku")
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch peminjaman.' },
      {
        status: 500,
      }
    );
  }
  else {
    const resData = await response.json();
    return resData;
  }
}


export const loader = () => {
  return defer({
    daftarBooking: loadBooking()
  })
}

export async function action({ params, request }) {

  const method = request.method;
  const data = await request.formData();
  console.log(data);
  const response = await fetch('http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/' + data.get('id'), {
    method: method,
    headers: {
      "Authorization": "Bearer"
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete this row.' },
      {
        status: 500,
      }
    );

  }
  return redirect("/admin/booked-books");
}





