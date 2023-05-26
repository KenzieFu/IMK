import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json, defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import classes from './adminbatch.module.css';

export const DaftarPengembalianBukuPage = () => {
  const [currentId, setCurrentId] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(false)
  const { daftarPengembalian } = useLoaderData('admin-pengembalian');
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
  const [searchBasedStat, setSearchBasedStat] = React.useState("");
  const [searchBasedDate, setSearchBasedDate] = React.useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [dropdownOpen3, setDropdownOpen3] = useState(false);


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };

  const toggleDropdown3 = () => {
    setDropdownOpen3(!dropdownOpen3);
  };
  const columns = [
    {
      id: "nama_siswa",
      name: <div className={classes["data-row"]}>Nama Siswa</div>,
      selector: (row) => <div className={classes["data-row"]}>{row.peminjaman.siswa.nama_lengkap}</div>,
      accessor: "nama_siswa",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      width: "13%",
    },
    {
      id: "judul_buku",
      name: <div className={classes["data-row"]}>Judul Buku</div>,
      selector: (row) => <div className={classes["data-row"]}>{row.peminjaman.buku.judul_buku}</div>,
      accessor: "judul_buku",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      width: "11%",
    },
    {
      id: "tanggal_pinjam",
      name: <div className={classes['data-row']}>Tanggal Pinjam</div>,
      selector: (row) => <div className={classes['data-row']}>{row.peminjaman.tanggal_pinjam}</div>,
      accessor: "tanggal_pinjam",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      width: "15%",
    },
    {
      id: "tanggal_kembali",
      name: <div className={classes['data-row']}>Tanggal Dikembalikan</div>,
      selector: (row) => <div className={classes['data-row']}>{row.peminjaman.tanggal_kembali}</div>,
      accessor: "tanggal_kembali",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      width: "15%",
    },
    {
      id: "tanggal_pengembalian",
      name: <div className={classes['data-row']}>Tanggal Pengembalian</div>,
      selector: (row) => <div className={classes['data-row']}>{row.tanggal_pengembalian}</div>,
      accessor: "tanggal_pengembalian",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      width: "15%",
    },
    {
      id: "status_kembali",
      name: <div className={classes['data-row']}>Status</div>,
      selector: (row) => <div className={classes['data-row']}>{row.status}</div>,
      accessor: "status_kembali",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      color: ((row) => row.status === "Tepat Waktu") ? "Green" : "Red",
      width: "15%",
    },
    {
      id: "button",
      name: <div className={classes['data-row']}>Aksi</div>,
      width: "20%",
      cell: (row) => (
        <div style={{ margin: "0 0" }} className="action-buttons">
          <input type="hidden" id="row" />
          <span onClick={() => showModalHandler(row.peminjaman.id_peminjaman)} className="action-check">
            {" "}
            <i class="bi bi-check-lg"> Setujui</i>
          </span>
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
      selector: (row) => row.button,
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
                Cari Data dalam rentang tanggal :
              </DropdownToggle>
              <DropdownMenu> */}
                <DropdownItem
                  onClick={() => {
                    setSearchBasedDate("");
                    setStartDate("");
                    setEndDate("");
                  }}
                  className="box-menu"
                >
                  Tanpa rentang tanggal
                </DropdownItem>
                <DropdownItem onClick={() => setSearchBasedDate("pinjam")} className="box-menu">
                  Tanggal Peminjaman
                </DropdownItem>
                <DropdownItem onClick={() => setSearchBasedDate("kembali")} className="box-menu">
                  Tanggal Kembali
                </DropdownItem>
                <DropdownItem onClick={() => setSearchBasedDate("pengembalian")} className="box-menu">
                  Tanggal Pengembalian
                </DropdownItem>
                {/* </DropdownMenu>
            </Dropdown>
            <Dropdown isOpen={dropdownOpen3} toggle={toggleDropdown3}>
              <DropdownToggle caret className="dropdown-toggle-search">
                Tampilkan data berdasarkan status :
              </DropdownToggle>
              <DropdownMenu> */}
                <DropdownItem
                  onClick={() => {
                    setSearchBasedStat("");
                  }}
                  className="box-menu"
                >
                  Tampilkan semua status
                </DropdownItem>
                <DropdownItem onClick={() => setSearchBasedStat("tepat_waktu")} className="box-menu">
                  Tepat Waktu
                </DropdownItem>
                <DropdownItem onClick={() => setSearchBasedStat("terlambat")} className="box-menu">
                  Terlambat
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          {/* <div className={classes["search-button"]}> */}
          <label htmlFor="start-date">Start Date:</label>
          <Input disabled={searchBasedDate === ""} id="start-date" value={startDate} type="date" onChange={(e) => setStartDate(e.target.value)} />
          <Input disabled={searchBasedDate === ""} id="end-date" value={endDate} type="date" onChange={(e) => setEndDate(e.target.value)} />
          {/* <Input
              disabled={searchBased === "" ? true : false}
              type="text"
              placeholder={searchBased === "nama" ? "Cari data dari nama siswa..." : searchBased === "judul" ? "Cari Data dari judul buku..." : "Cari data..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /> */}
          {/* </div> */}
        </>
      )}
      <Suspense fallback="">
        <Await resolve={daftarPengembalian}>
          {(loadedData) => (
            <DataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1vw" }}>
                  <h1 className={classes["judul1"]}>Tabel Pengembalian</h1>
                </div>
              }
              data={loadedData.filter((item) => {
                const keyword=searchTerm.toLowerCase();
                return(
                  item.peminjaman.siswa.nama_lengkap.toLowerCase().includes(keyword) ||
                  item.peminjaman.buku.judul_buku.toLowerCase().includes(keyword) ||
                  item.peminjaman.tanggal_pinjam.toLowerCase().includes(keyword) ||
                  item.peminjaman.tanggal_kembali.toLowerCase().includes(keyword) ||
                  item.tanggal_pengembalian.toLowerCase().includes(keyword) ||
                  item.tanggal_pengembalian.toLowerCase().includes(keyword) ||
                  item.status.toLowerCase().includes(keyword) 
                )
              })}
              columns={columns}
              pagination={loadedData}
            />
          )}
        </Await>
      </Suspense>
      {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler} />}
      {location.state && <div>{location.state.message}</div>}
    </>
  );
}


const loadKembali = async () => {
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/pengembalian")
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch pengembalian.' },
      {
        status: 500,
      }
    );
  }
  else {
    const resData = await response.json();
    console.log(response)
    return resData;
  }
}

export const loader = () => {
  return defer({
    daftarPengembalian: loadKembali()
  })
}

export async function action({ params, request }) {

  const method = request.method;
  const data = await request.formData();
  console.log(data);
  const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/pengembalian/' + data.get('id'), {
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
  return redirect("/admin/returned-books");
}





