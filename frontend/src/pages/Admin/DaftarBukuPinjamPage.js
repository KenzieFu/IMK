import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { KembaliModal } from '../../components/admin/modals/KembaliModal';
import { memo } from 'react';
import { json, defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from './adminbatch.module.css'


export const DaftarBukuPinjamPage = () => {
  const [currentId, setCurrentId] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(false)
  const { daftarPinjam } = useLoaderData('admin-peminjaman');
  const location = useLocation();
  console.log(currentId);

  const mapKategoriToOptions = (bukuData) => {
    const uniqueKategori = [...new Set(bukuData.map((buku) => buku.kategori.nama_kategori))];

    return uniqueKategori.map((kategori) => (
      <DropdownItem onClick={() => setSearchBased(kategori)} className="box-menu">
        {kategori}
      </DropdownItem>
    ));
  };
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
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };
  const columns = [
    {
      id: 'id',
      name: <div className={classes['data-row']}>ID Pinjam</div>,
      selector: (row) =>  <div className={classes['data-rowid']}>{row.id_peminjaman}</div>,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      width: "10%",
    },
    {
      id: "id_siswa",
      name: <div className={classes['data-row']}>Id Siswa</div>,
      selector: (row) =>  <div className={classes['data-row']}>{row.id_siswa}</div>,
      accessor: "id_siswa",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    {
      id: "nama_siswa",
      name:<div className={classes['data-row']}>Nama Siswa</div>,
      selector: (row) => <div className={classes['data-row']}>{row.siswa.nama_lengkap}</div>,
      accessor: "nama_siswa",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    {
      id: "judul_buku",
      name:<div className={classes['data-row']}>Judul Buku</div>,
      selector: (row) =>  <div className={classes['data-row']}>{row.buku.judul_buku}</div>,
      accessor: "judul_buku",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    },

    {
      id: "tanggal_pinjam",
      name: <div className={classes['data-row']}>Tanggal Pinjam</div>,
      selector: row => {
        const tanggalPinjam = new Date(row.tanggal_pinjam);
        return tanggalPinjam.toLocaleDateString("en-GB");
      },
      accessor: "tanggal_pinjam",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    {
      id: "tanggal_kembali",
      name: <div className={classes['data-row']}>Tanggal Pengembalian</div>,
      selector: row => {
        const tanggalKembali = new Date(row.tanggal_kembali);
        return tanggalKembali.toLocaleDateString("en-GB");
      },
      accessor: "tanggal_kembali",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    {
      id: "button",
      name: <div className={classes['data-row']}>Aksi</div>,
      width: "30%",
      cell: (row) =>
      (
        <div className={classes["batchbut"]}>
          <Link to={`/admin/borrowed-books/${row.id_peminjaman}`} style={{ cursor: "pointer", textDecoration: "none" }} className={classes["detailbut"]}>
              Rincian &nbsp; <i class="fa fa-info-circle"></i></Link>{'                    '}{'       '}
          <input type="hidden" id='row' />
          <span onClick={() => showModalHandler(row.id_peminjaman)} style={{ cursor: "pointer" }} className={classes["savbut"]}> 
            Dikembalikan  &nbsp; <i class="fa fa-solid fa-arrow-left"></i> </span>

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
      selector: row => row.button,
      button: true,
    },
  ];
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
                {/* <DropdownItem
                  onClick={() => {
                    setSearchBased("");
                    setSearchTerm("");
                  }}
                  className="box-menu"
                >
                  Tampilkan Semua Data
                </DropdownItem> */}
                <DropdownItem onClick={() => setSearchBased("nama")} className="box-menu">
                  Nama Siswa
                </DropdownItem>
                <DropdownItem onClick={() => setSearchBased("judul")} className="box-menu">
                  Judul Buku
                </DropdownItem>
                {/* </DropdownMenu>
            </Dropdown>
            <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2}>
              <DropdownToggle caret className="dropdown-toggle-search">
                Tampilkan Berdasarkan Rentang Tanggal
              </DropdownToggle>
              <DropdownMenu> */}
                {/* <DropdownItem
                  onClick={() => {
                    setSearchBasedDate("");
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="box-menu"
                >
                  Tanpa rentang tanggal
                </DropdownItem> */}
                <DropdownItem onClick={() => setSearchBasedDate("pinjam")} className="box-menu">
                  Rentang Tanggal Pinjam
                </DropdownItem>
                <DropdownItem onClick={() => setSearchBasedDate("kembali")} className="box-menu">
                  Rentang Tanggal kembali
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <label htmlFor="start-date">Start Date:</label>
          <Input disabled={searchBasedDate === ""} id="start-date" value={startDate} type="date" onChange={(e) => setStartDate(e.target.value)} />
          <Input disabled={searchBasedDate === ""} id="end-date" value={endDate} type="date" onChange={(e) => setEndDate(e.target.value)} />
          <Input
            disabled={searchBased === "" ? true : false}
            type="text"
            placeholder={searchBased === "nama" ? "Pencarian Berdasarkan Nama Siswa" : searchBased === "judul" ? "Pencarian Data Berdasarkan Judul Buku" : "Cari data..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </>
      )}
      <Suspense fallback="">
        <Await resolve={daftarPinjam}>
          {(loadedData) => (
            <DataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1vw" }}>
                  <h1 className={classes["judul1"]}>Tabel Peminjaman</h1>
                  <Link to="create" className={classes["buttoncreate"]}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8V19C3 21.201 4.794 22 6 22H21V20H6.012C5.55 19.988 5 19.806 5 19C5 18.899 5.009 18.809 5.024 18.727C5.136 18.151 5.608 18.01 6.012 18H21V4C21 2.897 20.103 2 19 2H6C4.794 2 3 2.799 3 5V8ZM6 4H19V16H5V5C5 4.194 5.55 4.012 6 4Z" fill="white"/>
                      <path d="M11 14H13V11H16V9H13V6H11V9H8V11H11V14Z" fill="white"/>
                      </svg>
                      Tambah Peminjaman       
                  </Link>
                </div>
              }
              data={loadedData.filter((item) => {
                  const keyword=searchTerm.toLowerCase()
                  return(
                    String(item.id_peminjaman).includes(keyword) ||
                    String(item.id_siswa).includes(keyword)  ||
                    item.siswa.nama_lengkap.toLowerCase().includes(keyword) ||
                    item.buku.judul_buku.toLowerCase().includes(keyword) ||
                    new Date(item.tanggal_pinjam).toLocaleDateString("en-GB").includes(keyword) ||
                  new Date(item.tanggal_kembali).toLocaleDateString("en-GB").includes(keyword) 


                  )
              })}
              columns={columns}
              pagination
            />
          )}
        </Await>
      </Suspense>
      {showDeleteModal && <KembaliModal id={currentId} onClose={closeModalHandler} />}
      {location.state && <div>{location.state.message}</div>}
    </>
  );
}


const loadPinjams = async () => {
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman")
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
    daftarPinjam: loadPinjams()
  })
}

export async function action({ params, request }) {

  const method = request.method;
  const data = await request.formData();
  console.log(data);
  const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/' + data.get('id'), {
    method: method,
    headers: {
      "Authorization": "Bearer",

    }
  });
  console.log(response);

  if (!response.ok) {
    throw json(
      { message: 'Could not delete this row.' },
      {
        status: 500,
      }
    );

  }
  return redirect("/admin/borrowed-books");
}





