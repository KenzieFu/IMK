
import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json, defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import "./BookTablePage.css";

export const BookTablePage = () => {

  const mapKategoriToOptions = (bukuData) => {
    const uniqueKategori = [...new Set(bukuData.map((buku) => buku.kategori.nama_kategori))];

    return uniqueKategori.map((kategori) => (
      <DropdownItem onClick={() => setSearchBased(kategori)} className="box-menu">
        {kategori}
      </DropdownItem>
    ));
  };
  const [currentId, setCurrentId] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(false)
  const { books } = useLoaderData('admin-buku');
  const location = useLocation();

  const [advanceSearch, setAdvanceSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchBased, setSearchBased] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const showModalHandler = (id) => {
    setDeleteModal(true);
    setCurrentId(id);
  }
  const closeModalHandler = () => {
    setDeleteModal(false);
    setCurrentId((prev) => prev);

  }

  const columns = [
    {
      id: 'id',
      name: <div className="data-row">ID Buku</div>,
      selector: (row) => <div className="data-row">{row.id_buku}</div>,

      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      width: "10%",
    },
    {
      id: "judul_buku",
      name: <div className="data-row">Judul Buku</div>,
      selector: (row) => <div className="data-row">{row.judul_buku}</div>,
      accessor: "judul_buku",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
    },
    {
      id: "pengarang",
      name: <div className="data-row">Pengarang</div>,
      selector: (row) =><div className="data-row">{row.pengarang}</div>,
      accessor: "pengarang",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
    },
    {
      id: "kategori",
      accessor: "kategori.nama_kategori",
      name: <div className="data-row">Kategori</div>,
      selector: row => <div className="data-row">{row.kategori.nama_kategori}</div>,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
    },
    {
      id: "button",
      name: <div className="data-row">Aksi</div>,
      width: "30%",
      cell: (row) =>
      (
        <div className="action-buttons" >
          <Link to={`/admin/books/${row.id_buku}`} style={{ cursor: "pointer", textDecoration: "none"}} className="action-detail">Rincian</Link>{'                    '}{'       '}
          <input type="hidden" id='row' />
          <span onClick={() => showModalHandler(row.id_buku)} style={{ cursor: "pointer" }} className="action-delete">Hapus</span>

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
      <div className="search-button">
        <Input type="text" placeholder="Cari Berdasarkan Judul Buku" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
        <div>
          <Button onClick={() => setAdvanceSearch(!advanceSearch)} className="action-filter">
            Pencarian Lebih Lanjut
          </Button>
        </div>
      </div>
      {advanceSearch && (
        <>
          <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret className="dropdown-toggle-search">
              Tampilkan Buku Berdasarkan Kategori
            </DropdownToggle>
            <DropdownMenu>
              {/* <DropdownItem onClick={() => setSearchBased("")}>Tampilkan semua data</DropdownItem>
              <DropdownItem divider />
              <DropdownItem header className="box-menu">
                Kategori
              </DropdownItem> */}
              <Suspense fallback="Loading...">
                <Await resolve={books}>
                  {(bukuData) => {
                    return <>{mapKategoriToOptions(bukuData)}</>;
                  }}
                </Await>
              </Suspense>

              {/* <DropdownItem  onClick={() => setSearchBased('admin')}>
            Admin
          </DropdownItem>
          <DropdownItem  onClick={() => setSearchBased('petugas')}>
            Petugas
          </DropdownItem>
          <DropdownItem  onClick={() => setSearchBased('kasir')}>
            Kasir
          </DropdownItem> */}
            </DropdownMenu>
          </Dropdown>
        </>
      )}
      <Suspense fallback="">
        <Await resolve={books}>
          {(loadedData) => (
            <DataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h2>Tabel Buku</h2>
                  <Link to="create" className="button-create">
                    <i class="bi bi-person-plus"> Tambah Buku</i>
                  </Link>
                </div>
              }
              data={loadedData.filter((item) => {
                if (searchBased === "") {
                  return item.judul_buku.toLowerCase().includes(searchTerm.toLowerCase());
                } else if (searchBased === item.kategori.nama_kategori) {
                  return item.judul_buku.toLowerCase().includes(searchTerm.toLowerCase());
                }
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
}


const loadBooks = async () => {

  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/buku")
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: 'Could not fetch books.' },
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
    books: loadBooks()
  })
}

export async function action({ params, request }) {

  const method = request.method;
  const data = await request.formData();
  console.log(data);
  const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/buku/' + data.get('id'), {
    method: method,
    headers: {
      "Authorization": "Bearer"
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not delete book.' },
      {
        status: 500,
      }
    );

  }
  return redirect("/admin/books");
}



