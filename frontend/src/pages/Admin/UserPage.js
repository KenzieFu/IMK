import React, { Suspense, useEffect, useState } from "react";
import DataTable, { memoize } from "react-data-table-component";
import { DeleteModal } from "../../components/admin/modals/DeleteModal";
import { memo } from "react";
import { json, defer, Await, useLoaderData, redirect, useLocation, Link } from "react-router-dom";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, } from "reactstrap";
import classes from './adminbatch.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateModal } from "../../components/admin/modals/UpdateModals";
import { DeleteRame } from "../../components/admin/modals/DeleteRame";

const notifyStatus = () => toast.success('Status para user berhasil diaktifkan!', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
});


export const UserPage = () => {
  const navigate=useNavigate();
  const [currentId, setCurrentId] = useState(null);
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [showDeleteRameModal, setDeleteRameModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);
  const [showUpdateTModal, setUpdateTModal] = useState(false);
  const { akuns } = useLoaderData("admin-akun");
  const location = useLocation();
  console.log(currentId);
  const filtered=akuns.filter(item=>item.hak_akses !="Admin")

  const [advanceSearch, setAdvanceSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchBased, setSearchBased] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [reloadTable, setReloadTable] = useState(false); // State to trigger table reload

  const [akun, setUser] = useState([])

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

  const showUpModalHandler = () => {
    setUpdateModal(true);

  };
  const closeUpModalHandler = () => {
    setUpdateModal(false);

  };
  const showUpTdkModalHandler = () => {
    setUpdateTModal(true);

  };
  const closeUpTdkModalHandler = () => {
    setUpdateTModal(false);

  };
  const showDelRameModalHandler = () => {
    setDeleteRameModal(true);

  };
  const closeDelRameModalHandler = () => {
    setDeleteRameModal(false);

  };


  const [selectedStatus, setSelectedStatus] = useState([])
  console.log(akuns)

  const handlerSelectedStatus=(id)=>{
    setSelectedStatus((prevStatus) =>
    prevStatus.includes(id) ? prevStatus.filter((status) => status !== id) : [...prevStatus, id]
  );
  }


  const handleDeleteBanyak = async (id) => {

    try {

      const response = await fetch('  http://localhost:8080/admin-perpustakaan-methodist-cw/akun', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer"
        },
        body: JSON.stringify({
          id_akun: id,


        })
      });

      const deletedData = await response.json();
      console.log('Data deleted:', deletedData);

      navigate("/admin/user")

    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const handleCheckAll = () => {
    if (selectedStatus.length === akuns.length) {

      setSelectedStatus([]);
    } else {

      const allIds = akuns.map((akun) => akun.id_akun);
      setSelectedStatus(allIds);
    }
  };
  const handleUpdateStatusAktif = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/akun-aktivasi', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer"
        },
        body: JSON.stringify({
          id_akun: id,
          status: "Aktif"
        })
      });

      const updatedData = await response.json();
      console.log('Data updated:', updatedData);


      setSelectedStatus([]);

      notifyStatus();

      navigate("/admin/user")
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };


  const handleUpdateStatusTdkAktif = async (id) => {

    try {

      const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/akun-aktivasi', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer"
        },
        body: JSON.stringify({
          id_akun: id,
          status: "Tidak Aktif"

        })
      });

      const createdData = await response.json();
      console.log('Data created:', createdData);

      // Reset the form after successful creation
      setSelectedStatus([]);

      notifyStatus();

      navigate("/admin/user")

    } catch (error) {
      console.error('Error creating data:', error);
    }
  };
  const columns = [
    {
      id: "check",
  name: <div style={{display: "flex"}}>
    <span  className={classes["data-row"]}>Check</span>
  <Input
    type="checkbox"
    checked={selectedStatus.length === akuns.length}
    onChange={() => handleCheckAll()}
    className={classes["check-all"]}
    style={{marginLeft: "7px"}}
  />
</div>,
  cell: (row) => (
    <Input
    type="checkbox"
      checked={selectedStatus.includes(row.id_akun)}
      onChange={() => { handlerSelectedStatus(row.id_akun) }}
      className={classes['data-rowid']}
    />
  ),
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
      width: "10%",
    },
    {
      id: "id",
      name: <span className={classes['data-row']}>ID Akun</span>,
      // tambahkan span untuk style tulisan
      selector: (row) => <span className={classes['data-rowid']}>{row.id_akun}</span>,
      // selector: (row) => row.id_akun,
      sortable: true,
      accessor:"id_akun",
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
      accessor:"username",
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
      accessor:"hak_akses",
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
      },
    },
    {
      id: "tipe",
      name: <span className={classes['data-row']}>Status</span>,
      selector: (row) => <span className={classes['data-row']}> {row.status}</span>,
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


  return (
    <>
      <div className={classes["search-button"]}>
        <Input type="text" placeholder="Cari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={classes["searchbox"]} />
        <Button onClick={() => setAdvanceSearch(!advanceSearch)} className={classes["action-filter"]}>
          {" "}
          Filter <i class="fa fa-filter" arifa-hidden="true"></i>
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
        <Await resolve={filtered}>
          {(loadedData) => (
            <DataTable
              // title={<h1 className={classes['judul1']}>Akun</h1>}
              // data={loadedData.filter((item) => {
              //   if (searchBased === "") {
              //     return item.username.toLowerCase().includes(searchTerm.toLowerCase());
              //   } else if (searchBased === "siswa" && item.hak_akses.toLowerCase() === "siswa") {
              //     return item.username.toLowerCase().includes(searchTerm.toLowerCase());
              //   } else if (searchBased === "admin" && item.hak_akses.toLowerCase() === "admin") {
              //     return item.username.toLowerCase().includes(searchTerm.toLowerCase());
              //   } else if (searchBased === "petugas" && item.hak_akses.toLowerCase() === "petugas") {
              //     return item.username.toLowerCase().includes(searchTerm.toLowerCase());
              //   } else if (searchBased === "kasir" && item.hak_akses.toLowerCase() === "kasir") {
              //     return item.username.toLowerCase().includes(searchTerm.toLowerCase());
              //   }
              // })}
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1vw" }}>
                  <h1 className={classes["judul1"]}>Tabel Akun</h1>
                </div>
              }
              data={loadedData.filter((item) =>
                {
                  const keyword=searchTerm.toLowerCase()
                 return (
                  String(item.id).includes(keyword) ||
                  item.username.toLowerCase().includes(keyword) ||
                  item.hak_akses.toLowerCase().includes(keyword) ||
                  item.status.toLowerCase().includes(keyword) 
                  
                )}

              )}
              columns={columns}
              pagination

              className="data-table" // Atribut selector CSS untuk DataTable
            />
          )}
        </Await>
      </Suspense>
      {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler} />}
      {showDeleteRameModal && <DeleteRame onDelete={() =>{handleDeleteBanyak(selectedStatus)}} onClose={closeDelRameModalHandler}/>}
      {showUpdateModal && <UpdateModal onUpdate={()=>{handleUpdateStatusAktif(selectedStatus)}}  onClose={closeUpModalHandler} />}
      {showUpdateTModal && <UpdateModal onUpdate ={()=>{handleUpdateStatusTdkAktif(selectedStatus)}} onClose={closeUpTdkModalHandler} />}
      {location.state && <div>{location.state.message}</div>}
      <div className={classes['button-on']}>
      <Button onClick={()=> showUpModalHandler(selectedStatus)} className={classes['savbut']}>Aktif Akun</Button>
      <Button onClick={()=> showUpTdkModalHandler(selectedStatus)} className={classes['detailbut']}>Non-aktifkan Akun</Button>
      <Button onClick={()=> showDelRameModalHandler(selectedStatus)} className={classes['delbut']}>Hapus Akun</Button>
      </div>



    </>
  );

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

export const loader = async() => {
  const data = await loadAkuns()
  const akun = data
  return defer({
    akuns: akun
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
