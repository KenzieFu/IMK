import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json, defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Buttons from '../../UI/admin/Buttons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const DaftarBukuPinjamPage = () => {
  const [currentId, setCurrentId] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(false)
  const { daftarPinjam } = useLoaderData('admin-peminjaman');
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


  const columns = [
    {
      id: 'id',
      name: "ID",
      selector: row => row.id_peminjaman,
      sortable: true,
    },
    {
      id: "id_siswa",
      name: 'Id Siswa',
      selector: row => row.id_siswa,
      accessor: "id_siswa",
      sortable: true,
    },
    {
      id: "nama_siswa",
      name: 'Nama Siswa',
      selector: row => row.siswa.nama_lengkap,
      accessor: "nama_siswa",
      sortable: true,
    },

    // {
    //   id: "judul_buku",
    //   name: 'Judul Buku',
    //   selector: row => row.buku.judul_buku,
    //   accessor: "judul_buku",
    //   sortable: true,
    // },

    {
      id: "tanggal_pinjam",
      name: 'Tanggal Pinjam',
      selector: row => {
        const tanggalPinjam = new Date(row.tanggal_pinjam);
        return tanggalPinjam.toLocaleDateString("en-GB");
      },
      accessor: "tanggal_pinjam",
      sortable: true,
    },
    {
      id: "tanggal_kembali",
      name: 'Tanggal Kembali',
      selector: row => {
        const tanggalKembali = new Date(row.tanggal_kembali);
        return tanggalKembali.toLocaleDateString("en-GB");
      },
      accessor: "tanggal_kembali",
      sortable: true,
    },
    {
      id: "button",
      name: "Action",
      width: "30%",
      cell: (row) =>
      (
        <div style={{ margin: "0 0" }} >
          <Link to={`/admin/borrowed-books/${row.id_peminjaman}`} style={{ cursor: "pointer", textDecoration: "none", color: "gray" }}>Detail</Link>{'                    '}{'       '}
          <input type="hidden" id='row' />
          <span onClick={() => showModalHandler(row.id_peminjaman)} style={{ cursor: "pointer" }}>Delete</span>

        </div>
      ),

      ignoreRowClick: true,
      allowOverflow: true,
      selector: row => row.button,
      button: true,
    },
  ];


  return (
    <>
      <button onClick={() => setAdvanceSearch(!advanceSearch)}>
        Pencarian Lebih Lanjut
      </button>
      {
        advanceSearch &&
        <div>
          <select onChange={(e) => {
            setSearchBased(e.target.value)
            if(e.target.value === ""){
            setSearchTerm("")
            }
            }}>
            <option disabled >Cari berdasarkan:</option>
            <option value="">Tampilkan semua data</option>
            <option value="nama_siswa">Nama Siswa</option>
            <option value="judul_buku">Judul Buku</option>
          </select>
          <input
            disabled={searchBased === "" ? true : false}
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div>
            <select onChange={(e) => {
            setSearchBasedDate(e.target.value)
            if(e.target.value === ''){
              setStartDate(null)
              setEndDate(null)
            }
            }}>
              <option disabled >Tampilkan data dalam range tanggal :</option>
              <option value="">Data dalam seluruh rentang tanggal</option>
              <option value="tgl_pinjam">Data dalam rentang tanggal pinjam tertentu</option>
              <option value="tgl_kembali">Data dalam rentang tanggal kembali tertentu</option>
            </select>
          </div>
          <div>
            <label htmlFor="start-date">Start Date:</label>
            <DatePicker
              disabled={searchBasedDate === ""}
              id="start-date"
              selected={startDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setStartDate(date)}
            />
            <DatePicker
              disabled={searchBasedDate === ""}
              id="end-date"
              selected={endDate}
              dateFormat="dd/MM/yyyy"
              onChange={(date) => setEndDate(date)}
            />
          </div>
        </div>
      }
      <Suspense fallback="">
        <Await resolve={daftarPinjam} >
          {(loadedData) =>
            <DataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h2>Tabel Peminjaman</h2>
                  <Link to="create">Create</Link>
                </div>
              }
              data={loadedData.filter((item) => {
                if (searchBased === "" && startDate === null && endDate === null) {
                  return item;
                } else if (
                  searchBased === "nama_siswa" &&
                  item.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item;
                } else if (
                  searchBased === "judul_buku" &&
                  item.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return item;
                } else if (
                  searchBasedDate === "tgl_kembali" &&
                  startDate !== '' &&
                  endDate !== '' &&
                  item.tanggal_kembali >= startDate &&
                  item.tanggal_kembali <= endDate
                ) {
                  return item;
                } else if (
                  searchBasedDate === "tgl_kembali" &&
                  startDate !== null &&
                  endDate !== null &&
                  item.tanggal_kembali >= startDate &&
                  item.tanggal_kembali <= endDate
                ) {
                  return item;
                }
                // else if (
                //   searchBased === "tgl_pengembalian" &&
                //   item.tanggal_kembali.toString().toLowerCase().includes(searchTerm.toLowerCase())
                // ) {
                //   return item;
                // } else if (
                //   searchBased === "tgl_pinjam" &&
                //   item.tanggal_pinjam.toString().toLowerCase().includes(searchTerm.toLowerCase())
                // ) {
                //   return item;
                // }
                //else if (

                //   item.tanggal_kembali.toString().toLowerCase().includes(searchTerm.toLowerCase())
                // ) {
                //   return item;
                // }

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
  return redirect("/admin/borrowed-books");
}





