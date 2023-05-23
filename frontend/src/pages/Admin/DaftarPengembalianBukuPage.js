import React, { Suspense, useEffect, useState } from 'react'
import DataTable, { memoize } from 'react-data-table-component'
import { DeleteModal } from '../../components/admin/modals/DeleteModal';
import { memo } from 'react';
import { json, defer, Await, useLoaderData, redirect, useLocation, Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";

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
      name: 'Nama Siswa',
      selector: row => row.peminjaman.siswa.nama_lengkap,
      accessor: "nama_siswa",
      sortable: true,
    },
    {
      id: "judul_buku",
      name: 'Judul Buku',
      selector: row => row.peminjaman.buku.judul_buku,
      accessor: "judul_buku",
      sortable: true,
    },
    {
      id: "tanggal_pinjam",
      name: 'Tanggal Pinjam',
      selector: row => row.peminjaman.tanggal_pinjam,
      accessor: "tanggal_pinjam",
      sortable: true,
    },
    {
      id: "tanggal_kembali",
      name: 'Tanggal Dikembalikan',
      selector: row => row.peminjaman.tanggal_kembali,
      accessor: "tanggal_kembali",
      sortable: true,
    },
    {
      id: "tanggal_pengembalian",
      name: 'Tanggal Pengembalian',
      selector: row => row.tanggal_pengembalian,
      accessor: "tanggal_pengembalian",
      sortable: true,
    },
    {
      id: "status_kembali",
      name: 'Status',
      selector: row => row.status,
      accessor: "status_kembali",
      sortable: true,
      color: (row => row.status === "Tepat Waktu") ? "Green" : "Red"
    },
    {
      id: "button",
      name: "Action",
      width: "30%",
      cell: (row) =>
      (
        <div style={{ margin: "0 0" }} >
          <Link to={`/admin/borrowed-books/${row.peminjaman.id_peminjaman}`} style={{ cursor: "pointer", textDecoration: "none", color: "gray" }}>Detail</Link>{'                    '}{'       '}
          <input type="hidden" id='row' />
          <span onClick={() => showModalHandler(row.peminjaman.id_peminjaman)} style={{ cursor: "pointer" }}>Delete</span>

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
              <DropdownItem onClick={() => { setSearchBased(""); setSearchTerm("") }} className="box-menu">
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
                Tanggal Kembali
              </DropdownItem>
              <DropdownItem onClick={() => setSearchBasedDate("pengembalian")} className="box-menu">
                Tanggal Pengembalian
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown isOpen={dropdownOpen3} toggle={toggleDropdown3}>
            <DropdownToggle caret className="dropdown-toggle-search">
              Tampilkan data berdasarkan status :
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => { setSearchBasedStat(""); }} className="box-menu">
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
      }
      <Suspense fallback="">
        <Await resolve={daftarPengembalian} >
          {(loadedData) =>
            <DataTable
              title="Tabel Pengembalian"
              data={loadedData.filter((item) => {

                if (searchBased === "" && searchBasedDate === "" && searchBasedStat === "") {
                  return item;
                }
                if (searchBased === "nama") {
                  if (searchBasedDate === "" && searchBasedStat === "") {
                    return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase())
                  } if (searchBasedStat === "") {
                    if (searchBasedDate === "pinjam") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate
                    } if (searchBasedDate === "kembali") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate
                    } if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate
                    }
                  } if (searchBasedStat === "terlambat") {
                    if (searchBasedDate === "pinjam") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate && item.status.toLowerCase() === "terlambat"
                    } if (searchBasedDate === "kembali") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate && item.status.toLowerCase() === "terlambat"
                    } if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate && item.status.toLowerCase() === "terlambat"
                    }
                  } if (searchBasedStat === "tepat_waktu") {
                    if (searchBasedDate === "pinjam") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate && endDate && item.status.toLowerCase() === "tepat waktu"
                    } if (searchBasedDate === "kembali") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate && endDate && item.status.toLowerCase() === "tepat waktu"
                    } if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate && endDate && item.status.toLowerCase() === "tepat waktu"
                    }
                  }
                }
                if (searchBased === "judul") {
                  if (searchBasedDate === "" && searchBasedStat === "") {
                    return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase())
                  } if (searchBasedStat === "") {
                    if (searchBasedDate === "pinjam") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate
                    } if (searchBasedDate === "kembali") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate
                    } if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate
                    }
                  } if (searchBasedStat === "terlambat") {
                    if (searchBasedDate === "pinjam") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate && item.status.toLowerCase() === "terlambat"
                    } if (searchBasedDate === "kembali") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate && item.status.toLowerCase() === "terlambat"
                    } if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate && item.status.toLowerCase() === "terlambat"
                    }
                  } if (searchBasedStat === "tepat_waktu") {
                    if (searchBasedDate === "pinjam") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate && endDate && item.status.toLowerCase() === "tepat waktu"
                    } if (searchBasedDate === "kembali") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate && endDate && item.status.toLowerCase() === "tepat waktu"
                    } if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate && endDate && item.status.toLowerCase() === "tepat waktu"
                    }
                  }
                }
                if (searchBasedStat === "terlambat") {
                  if (searchBased === "" && item.status.toLowerCase() === "terlambat") {
                    if (searchBasedDate === "") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.status.toLowerCase() === "terlambat"
                    }
                    else if (searchBasedDate === "pinjam") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate && item.status.toLowerCase() === "terlambat"
                    } else if (searchBasedDate === "kembali") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate && item.status.toLowerCase() === "terlambat"
                    } else if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate && item.status.toLowerCase() === "terlambat"
                    }
                  }

                  else if (searchBased === "nama") {
                    if (searchBasedDate === "") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.status.toLowerCase() === "terlambat"
                    }
                    else if (searchBasedDate === "pinjam") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate && item.status.toLowerCase() === "terlambat"
                    } else if (searchBasedDate === "kembali") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate && item.status.toLowerCase() === "terlambat"
                    } else if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate && item.status.toLowerCase() === "terlambat"
                    }
                  }
                  else if (searchBased === "judul") {
                    if (searchBasedDate === "") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    }
                    else if (searchBasedDate === "pinjam") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate && item.status.toLowerCase() === "terlambat"
                    } else if (searchBasedDate === "kembali") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate && item.status.toLowerCase() === "terlambat"
                    } else if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate && item.status.toLowerCase() === "terlambat"
                    }
                  }
                } if (searchBasedStat === "tepat_waktu") {
                  if (searchBased === "" && item.status.toLowerCase() === "tepat waktu") {
                    if (searchBasedDate === "") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.status.toLowerCase() === "tepat waktu"
                    }
                    else if (searchBasedDate === "pinjam") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate && item.status.toLowerCase() === "tepat waktu"
                    } else if (searchBasedDate === "kembali") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate && item.status.toLowerCase() === "tepat waktu"
                    } else if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate && item.status.toLowerCase() === "tepat waktu"
                    }
                  }

                  else if (searchBased === "nama") {
                    if (searchBasedDate === "") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.status.toLowerCase() === "tepat waktu"
                    }
                    else if (searchBasedDate === "pinjam") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate && item.status.toLowerCase() === "tepat waktu"
                    } else if (searchBasedDate === "kembali") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate && item.status.toLowerCase() === "tepat waktu"
                    } else if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.siswa.nama_lengkap.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate && item.status.toLowerCase() === "tepat waktu"
                    }
                  }
                  else if (searchBased === "judul") {
                    if (searchBasedDate === "") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.status.toLowerCase() === "tepat waktu"
                    }
                    else if (searchBasedDate === "pinjam") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate && item.status.toLowerCase() === "tepat waktu"
                    } else if (searchBasedDate === "kembali") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate && item.status.toLowerCase() === "tepat waktu"
                    } else if (searchBasedDate === "pengembalian") {
                      return item.peminjaman.buku.judul_buku.toString().toLowerCase().includes(searchTerm.toLowerCase()) && item.tanggal_pengembalian >= startDate && item.tanggal_kembali <= endDate && item.status.toLowerCase() === "tepat waktu"
                    }
                  }
                }
                if(searchBasedDate === "pinjam"){
                  return item.peminjaman.tanggal_pinjam >= startDate && item.peminjaman.tanggal_pinjam <= endDate
                } if(searchBasedDate === "kembali"){
                  return item.peminjaman.tanggal_kembali >= startDate && item.peminjaman.tanggal_kembali <= endDate
                } if(searchBasedDate === "pengembalian"){
                  return item.tanggal_pengembalian >= startDate && item.tanggal_pengembalian <= endDate
                }
              })}
              columns={columns}
              pagination={loadedData}
            />
          }
        </Await>
      </Suspense>
      {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler} />}
      {location.state && <div>{location.state.message}</div>}
    </>
  )
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





