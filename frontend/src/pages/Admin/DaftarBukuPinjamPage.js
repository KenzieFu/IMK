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


export const DaftarBukuPinjamPage = () => {
  const [currentId, setCurrentId] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(false)
  const { daftarPinjam } = useLoaderData('admin-peminjaman');
  const location = useLocation();
  console.log(currentId);

  const mapKategoriToOptions = (bukuData) => {
    const uniqueKategori = [...new Set(bukuData.map((buku) => buku.kategori.nama_kategori))];

    return uniqueKategori.map((kategori) => (
      <DropdownItem onClick={() => setSearchBased(kategori)}>
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
    {
      id: "judul_buku",
      name: 'Judul Buku',
      selector: row => row.buku.judul_buku,
      accessor: "judul_buku",
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
      name: 'Tanggal Pengembalian',
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
          <Dropdown isOpen={dropdownOpen2} toggle={toggleDropdown2}>
            <DropdownToggle caret className="dropdown-toggle-search">
              Cari Data dalam rentang tanggal :
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => { setSearchBasedDate(""); setStartDate(''); setEndDate('') }} className="box-menu">
                Tanpa rentang tanggal
              </DropdownItem>
              <DropdownItem onClick={() => setSearchBasedDate("pinjam")} className="box-menu">
                Tanggal Peminjaman
              </DropdownItem>
              <DropdownItem onClick={() => setSearchBasedDate("kembali")} className="box-menu">
                Tanggal Pengembalian
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <label htmlFor="start-date">Start Date:</label>
          <Input
            disabled={searchBasedDate === ""}
            id="start-date"
            value={startDate}
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            disabled={searchBasedDate === ""}
            id="end-date"
            value={endDate}
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Input disabled={searchBased === "" ? true : false}
            type="text"
            placeholder={searchBased === "nama" ? "Cari data dari nama siswa..." : searchBased === "judul" ? "Cari Data dari judul buku..." : "Cari data..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />
        </>

        //   <div>
        //     <label htmlFor="start-date">Start Date:</label>
        //     <DatePicker
        //       disabled={searchBasedDate === ""}
        //       id="start-date"
        //       selected={startDate}
        //       dateFormat="dd/MM/yyyy"
        //       onChange={(date) => setStartDate(date)}
        //     />
        //     <DatePicker
        //       disabled={searchBasedDate === ""}
        //       id="end-date"
        //       selected={endDate}
        //       dateFormat="dd/MM/yyyy"
        //       onChange={(date) => setEndDate(date)}
        //     />
        //   </div>
        // </div>
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

                if (searchBased === "" && searchBasedDate === "") {
                  return item;
                }
                if (searchBased === "nama") {
                  if (searchBasedDate === "") {
                    return item.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase())
                  }
                  else if (searchBasedDate === "pinjam") {
                    return item.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pinjam >= startDate && item.tanggal_pinjam <= endDate
                  }else if (searchBasedDate === "kembali") {
                    return item.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_kembali >= startDate && item.tanggal_kembali <= endDate
                  }
                }
                if (searchBased === "judul") {
                  if (searchBasedDate === "") {
                    return item.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase())
                  }
                  else if (searchBasedDate === "pinjam") {
                    return item.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pinjam >= startDate && item.tanggal_pinjam <= endDate
                  }  else if (searchBasedDate === "kembali") {
                    return item.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_kembali >= startDate && item.tanggal_kembali <= endDate
                  }
                } if(searchBasedDate === "pinjam"){
                  return item.tanggal_pinjam >= startDate && item.tanggal_pinjam <= endDate
                } if(searchBasedDate === "kembali"){
                  return item.tanggal_kembali >= startDate && item.tanggal_kembali <= endDate
                }

                //  if(searchBased === "judul")
                // {
                //   return item.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase())
                // }
                //  if (
                //   searchBasedDate === "pinjam"
                // ) {
                //   if (searchBased === "" && item.tanggal_pinjam >= startDate && item.tanggal_pinjam <= endDate) {
                //     return item
                //   }
                //   else if (searchBased === "nama" && item.tanggal_pinjam >= startDate && item.tanggal_pinjam <= endDate) {
                //     return item.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase())
                //   } else if (
                //     searchBased === "judul" && item.tanggal_pinjam >= startDate && item.tanggal_pinjam <= endDate
                //   ) {
                //     return item.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase())
                //   }
                // }

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





