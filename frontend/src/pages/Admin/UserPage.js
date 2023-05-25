import React, { Suspense, useEffect, useState } from "react";
import DataTable, { memoize } from "react-data-table-component";
import { DeleteModal } from "../../components/admin/modals/DeleteModal";
import { memo } from "react";
import { json, defer, Await, useLoaderData, redirect, useLocation, Link } from "react-router-dom";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import classes from './adminbatch.module.css'

export const UserPage = () => {
  const [currentId, setCurrentId] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const { akuns } = useLoaderData("admin-akun");
  const location = useLocation();
  console.log(currentId);

  const [advanceSearch, setAdvanceSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchBased, setSearchBased] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const toggleDropdown2 = () => {
    setDropdownOpen2(!dropdownOpen2);
  };

  const showModalHandler = (id) => {
    setDeleteModal(true);
    setCurrentId(id);
  };
  const closeModalHandler = () => {
    setDeleteModal(false);
    setCurrentId((prev) => prev);
  };

  const columns = [
    {
      id: "id",
      name: <span className={classes['data-row']}>ID Akun</span>,
      // tambahkan span untuk style tulisan
      selector: (row) => <span className={classes['data-rowid']}>{row.id_akun}</span>,
      // selector: (row) => row.id_akun,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      width: "10%",
    },
    {
      id: "username",
      name: <span className={classes['data-row']}>Username</span>,
      selector: (row) => <span className={classes['data-row']}>{row.username}</span>,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
    },
    {
      id: "tipe",
      name: <span className={classes['data-row']}>Hak Akses</span>,
      selector: (row) => <span className={classes['data-row']}> {row.hak_akses}</span>,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    {
      id: "button",
      name: <span className={classes['data-row']}>Aksi</span>,
      width: "30%",
      cell: (row) => (
        <div className={classes["batchbut"]}>
          <Link to={`/admin/user/${row.id_akun}`} className={classes["detailbut"]}>
            Rincian &nbsp; <i class="fa fa-info-circle" aria-hidden="true"></i>
          </Link>
          <span onClick={() => showModalHandler(row.id_akun)} className={classes["delbut"]}>
            Hapus &nbsp; <i class="fa fa-minus-circle" aria-hidden="true"></i>
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
    },
  ];

  // const columns = [
  //   {
  //     id: "id",
  //     name: "ID",
  //     selector: (row) => row.id_akun,

  //     sortable: true,
  //   },
  //   {
  //     id: "username",
  //     name: "Username",
  //     selector: (row) => row.username,
  //     accessor: "username",
  //     sortable: true,
  //   },
  //   {
  //     id: "tipe",
  //     accessor: "accessor",
  //     name: "Hak Akses",
  //     selector: (row) => row.hak_akses,
  //     sortable: true,
  //   },
  //   {
  //     id: "button",
  //     name: "Action",
  //     width: "30%",
  //     cell: (row) => (
  //       <div style={{ margin: "0 0" }}>
  //         <Link to={`/admin/user/${row.id_akun}`} style={{ cursor: "pointer", textDecoration: "none", color: "gray" }}>
  //           Detail
  //         </Link>
  //         {"                    "}
  //         {"       "}
  //         <input type="hidden" id="row" />
  //         <span onClick={() => showModalHandler(row.id_akun)} style={{ cursor: "pointer" }}>
  //           Delete
  //         </span>
  //       </div>
  //     ),

  //     ignoreRowClick: true,
  //     allowOverflow: true,
  //     selector: (row) => row.button,
  //     button: true,
  //   },
  // ];
  /* const [data,setData]=useState(DUMMY_USER);


    const deleteHandler=(id,e)=>{
        e.preventDefault();

        const updatedData=data.filter(item=>item.id !== id);
        console.log("deleted" );
        setData(updatedData);
    } */
  return (
    <>
      <div className={classes["search-button"]}>
        <Input type="text" placeholder="Cari Berdasarkan Username" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={classes["searchbox"]} />
        <Button onClick={() => setAdvanceSearch(!advanceSearch)} className={classes["action-filter"]}>
          {" "}
          Filter <i class="fa fa-filter" aria-hidden="true"></i>
        </Button>
      </div>
      {/* <div className="dropdown-content"> */}
      {advanceSearch && (
        <>
          <div className={classes["downdown"]}>
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret className={classes["dropdown2"]}>
                Filter by
              </DropdownToggle>
              <DropdownMenu>
                {/* <DropdownItem onClick={() => setSearchBased("")}>Tampilkan semua data</DropdownItem> */}
                {/* <DropdownItem divider /> */}
                {/* <DropdownItem header>Hak Akses</DropdownItem> */}
                <DropdownItem onClick={() => setSearchBased("siswa")} className="box-menu">
                  Siswa
                </DropdownItem>
                <DropdownItem onClick={() => setSearchBased("admin")} className="box-menu">
                  Admin
                </DropdownItem>
                <DropdownItem onClick={() => setSearchBased("petugas")} className="box-menu">
                  Petugas
                </DropdownItem>
                {/* <DropdownItem onClick={() => setSearchBased("kasir")} className="box-menu">
                Kasir
              </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* <div className="additional-content"></div> */}
        </>
      )}

      {/* </div> */}
      <Suspense fallback="">
        <Await resolve={akuns}>
          {(loadedData) => (
            <DataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1vw" }}>
                  <h1 className={classes["judul1"]}>Tabel Akun</h1>
                  <Link to="create" className={classes["buttoncreate"]}>
                    <i class="bi bi-person-plus"> Tambah Akun</i>
                  </Link>
                </div>
              }
              data={loadedData.filter((item) => {
                if (searchBased === "") {
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
              className="data-table" // Atribut selector CSS untuk DataTable
            />
          )}
        </Await>
      </Suspense>

      {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler} />}
      {location.state && <div>{location.state.message}</div>}
    </>
  );

  // return (
  //   <>
  //     <Input type="text" placeholder="Cari Username..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
  //     <Button onClick={() => setAdvanceSearch(!advanceSearch)}>Pencarian Lebih Lanjut</Button>
  //     {advanceSearch && (
  //       <>
  //         <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
  //           <DropdownToggle caret>Tampilkan data berdasarkan:</DropdownToggle>
  //           <DropdownMenu>
  //             <DropdownItem onClick={() => setSearchBased("")}>Tampilkan semua data</DropdownItem>
  //             <DropdownItem divider />
  //             <DropdownItem header>Hak Akses</DropdownItem>
  //             <DropdownItem onClick={() => setSearchBased("siswa")}>Siswa</DropdownItem>
  //             <DropdownItem onClick={() => setSearchBased("admin")}>Admin</DropdownItem>
  //             <DropdownItem onClick={() => setSearchBased("petugas")}>Petugas</DropdownItem>
  //             <DropdownItem onClick={() => setSearchBased("kasir")}>Kasir</DropdownItem>
  //           </DropdownMenu>
  //         </Dropdown>
  //         <div></div>
  //       </>
  //     )}

  //     <Suspense fallback="">
  //       <Await resolve={akuns}>
  //         {(loadedData) => (
  //           <DataTable
  //             title="Tabel User"
  //             data={loadedData.filter((item) => {
  //               if (searchBased === "") {
  //                 return item.username.toLowerCase().includes(searchTerm.toLowerCase());
  //               } else if (searchBased === "siswa" && item.hak_akses.toLowerCase() === "siswa") {
  //                 return item.username.toLowerCase().includes(searchTerm.toLowerCase());
  //               } else if (searchBased === "admin" && item.hak_akses.toLowerCase() === "admin") {
  //                 return item.username.toLowerCase().includes(searchTerm.toLowerCase());
  //               } else if (searchBased === "petugas" && item.hak_akses.toLowerCase() === "petugas") {
  //                 return item.username.toLowerCase().includes(searchTerm.toLowerCase());
  //               } else if (searchBased === "kasir" && item.hak_akses.toLowerCase() === "kasir") {
  //                 return item.username.toLowerCase().includes(searchTerm.toLowerCase());
  //               }
  //             })}
  //             columns={columns}
  //             pagination
  //           />
  //         )}
  //       </Await>
  //     </Suspense>
  //     {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler} />}
  //     {location.state && <div>{location.state.message}</div>}
  //   </>
  // );
};

const loadAkuns = async () => {
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/akun");
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch akun." },
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
    akuns: loadAkuns(),
  });
};

export async function action({ params, request }) {
  const method = request.method;
  const data = await request.formData();
  console.log(data);
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/akun/" + data.get("id"), {
    method: method,
    headers: {
      Authorization: "Bearer",
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete user." },
      {
        status: 500,
      }
    );
  }
  return redirect("/admin/user");
}
