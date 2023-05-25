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
          <span onClick={() => showModalHandler(row.id_peminjaman)} style={{ cursor: "pointer" }} className={classes["delbut"]}> 
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
      selector: row => row.button,
      button: true,
    },
  ];
  return (
    <>
      <div className={classes["search-button"]}>
        <Input type="text" placeholder="Cari Berdasarkan Judul Buku" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={classes["searchbox"]} />
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
<<<<<<< HEAD
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1vw" }}>
                  <h1 className={classes["judul1"]}>Tabel Peminjaman</h1>
                  <Link to="create" className={classes["buttoncreate"]}>
                    <i class="bi bi-book"> Tambah Peminjaman</i>
=======
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h2 className="data-table-header">Tabel Peminjaman</h2>
                  <Link to="create" className={classes['buttoncreate']}>
                    <i class="bi bi-person-plus"> Tambah Peminjaman</i>
>>>>>>> f0bf0da209b978592a20e4c4fc28d26f98529a4e
                  </Link>
                </div>
              }
              data={loadedData.filter((item) => {
                if (searchBased === "" && searchBasedDate === "") {
                  return item;
                }
                if (searchBased === "nama") {
                  if (searchBasedDate === "") {
                    return item.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase());
                  } else if (searchBasedDate === "pinjam") {
                    return item.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pinjam >= startDate && item.tanggal_pinjam <= endDate;
                  } else if (searchBasedDate === "kembali") {
                    return item.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_kembali >= startDate && item.tanggal_kembali <= endDate;
                  }
                }
                if (searchBased === "judul") {
                  if (searchBasedDate === "") {
                    return item.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase());
                  } else if (searchBasedDate === "pinjam") {
                    return item.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pinjam >= startDate && item.tanggal_pinjam <= endDate;
                  } else if (searchBasedDate === "kembali") {
                    return item.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_kembali >= startDate && item.tanggal_kembali <= endDate;
                  }
                }
                if (searchBasedDate === "pinjam") {
                  return item.tanggal_pinjam >= startDate && item.tanggal_pinjam <= endDate;
                }
                if (searchBasedDate === "kembali") {
                  return item.tanggal_kembali >= startDate && item.tanggal_kembali <= endDate;
                }
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





