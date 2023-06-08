import React, { Suspense, useEffect, useState} from "react";
import DataTable, { memoize } from "react-data-table-component";
import { DeleteModal } from "../../components/admin/modals/DeleteModal";
import { memo } from "react";
import { json, defer, Await, useLoaderData, redirect, useLocation, Link } from "react-router-dom";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input } from "reactstrap";
import classes from "./adminbatch.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [showDeleteModal, setDeleteModal] = useState(false);
  const { books,stok } = useLoaderData("admin-buku");
  const location = useLocation();
  const navigate=useNavigate();

  const [advanceSearch, setAdvanceSearch] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchBased, setSearchBased] = React.useState("");
  const [showDeleteRameModal, setDeleteRameModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selectedBook, setSelectedBook] = useState([])
  const [book, setBooks] = useState([])

  const [reloadTable, setReloadTable] = useState(false); // State to trigger table reload



  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const showModalHandler = (id) => {
    setDeleteModal(true);
    setCurrentId(id);
  };
  const closeModalHandler = () => {
    setDeleteModal(false);
    setCurrentId((prev) => prev);
  };
  const showDelRameModalHandler = () => {
    setDeleteRameModal(true);

  };
  const closeDelRameModalHandler = () => {
    setDeleteRameModal(false);

  };

  const handlerSelectedBook=(id)=>{
    setSelectedBook((prevStatus) =>
    prevStatus.includes(id) ? prevStatus.filter((status) => status !== id) : [...prevStatus, id]
  );
  }
  const handleCheckAll = () => {
    if (selectedBook.length === books.length) {
      // If all items are already selected, uncheck all
      setSelectedBook([]);
    } else {
      // Otherwise, select all items
      const allIds = books.map((buku) => buku.id_buku);
      setSelectedBook(allIds);
    }
  };
  const handleDeleteBanyak = async (id) => {

    try {

      const response = await fetch(' http://localhost:8080/admin-perpustakaan-methodist-cw/buku-multiple', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer"
        },
        body: JSON.stringify({
          id_buku: id,


        })
      });

      const deletedData = await response.json();
      console.log('Data deleted:', deletedData);


      navigate("/admin/books")
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };
  const columns = [
    {
      id: "check",
  name: <div style={{display: "flex"}}>
    <span className={classes["data-row"]}>Check</span>
  <Input
    type="checkbox"
    checked={selectedBook.length === books.length}
    onChange={() => handleCheckAll()}
    className={classes["check-all"]}
    style={{marginLeft: "7px"}}
  />
</div>,
  cell: (row) => (
    <Input
    type="checkbox"
      checked={selectedBook.includes(row.id_buku)}
      onChange={() => { handlerSelectedBook(row.id_buku) }}
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
      name: <div className={classes["data-row"]}>ID Buku</div>,
      selector: (row) => <div className={classes["data-rowid"]}>{row.id_buku}</div>,

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
      name: <div className={classes["data-row"]}>Judul Buku</div>,
      selector: (row) => <div className={classes["data-row"]}>{row.judul_buku}</div>,
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
      name: <div className={classes["data-row"]}>Pengarang</div>,
      selector: (row) => <div className={classes["data-row"]}>{row.pengarang}</div>,
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
      name: <div className={classes["data-row"]}>Kategori</div>,
      selector: (row) => <div className={classes["data-row"]}>{row.kategori.nama_kategori}</div>,
      sortable: true,
      headerStyle: {
        fontWeight: "bold",
        textAlign: "center",
        justifyContent: "center",
      },
    },
    {
      id:"stok",
      name:<div className={classes["data-row"]}>Stok</div>,
      selector:(row)=>{
        const findItem=stok.find(item=>item.id_buku === row.id_buku);
        if(findItem)
        {
          return <div className={classes["data-row"]}>{findItem.stok>0?findItem.stok:"Kosong"}</div>
        }
        else
        {
          return <div className={classes["data-row"]}>Tidak Ada</div>
        }
      }
    },
    {
      id: "button",
      name: <div className={classes["data-row"]}>Aksi</div>,
      width: "30%",
      cell: (row) => (
        <div className={classes["batchbut"]}>
          <Link to={`/admin/books/${row.id_buku}`} style={{ cursor: "pointer", textDecoration: "none" }} className={classes["detailbut"]}>
            {" "}
            Rincian &nbsp; <i class="fa fa-info-circle" aria-hidden="true"></i>
          </Link>
          {"                    "}
          {"       "}
          <input type="hidden" id="row" />
          <span onClick={() => showModalHandler(row.id_buku)} style={{ cursor: "pointer" }} className={classes["delbut"]}>
            {" "}
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
      selector: (row) => row.button,
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
          </div>
        </>
      )}
      <Suspense fallback="">
        <Await resolve={books}>
          {(loadedData) => (
            <DataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1vw" }}>
                  <h1 className={classes["judul1"]}>Tabel Buku</h1>
                  <Link to="create" className={classes["buttoncreate"]}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 8V19C3 21.201 4.794 22 6 22H21V20H6.012C5.55 19.988 5 19.806 5 19C5 18.899 5.009 18.809 5.024 18.727C5.136 18.151 5.608 18.01 6.012 18H21V4C21 2.897 20.103 2 19 2H6C4.794 2 3 2.799 3 5V8ZM6 4H19V16H5V5C5 4.194 5.55 4.012 6 4Z" fill="white"/>
                    <path d="M11 14H13V11H16V9H13V6H11V9H8V11H11V14Z" fill="white"/> 
                    </svg>
                    Tambah buku
                  </Link>
                </div>
              }
              data={loadedData.filter((item) => {
                  let keyword=searchTerm?.toLowerCase()
                  return(
                    String(item?.id_buku)?.includes(keyword) ||
                    item?.judul_buku?.toLowerCase().includes(keyword) ||
                    item?.pengarang?.toLowerCase().includes(keyword) ||
                    item?.nama_kategori?.toLowerCase().includes(keyword)
                  )
              })}
              columns={columns}
              pagination
            />
          )}
        </Await>
      </Suspense>
      {showDeleteModal && <DeleteModal id={currentId} onClose={closeModalHandler} />}
      {showDeleteRameModal && <DeleteRame onDelete={() =>{handleDeleteBanyak(selectedBook)}} onClose={closeDelRameModalHandler}/>}
      {location.state && <div>{location.state.message}</div>}
      <div className={classes['button-on']}>
      <Button onClick={()=>showDelRameModalHandler(selectedBook)} className={classes['delbut']}>Hapus Buku</Button>
      </div>

    </>
  );
};


const loadBooks = async () => {
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/buku");
  console.log(response);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch books." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
};

const loadStocks=async()=>{
  const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/buku-perpus");
  if (!response.ok) {
    throw json(
      { message: "Could not fetch books." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}


export const loader = async() => {
  const data = await loadBooks()
  const stok= await loadStocks()
  const book = data
  return defer({
    books: book,
    stok:stok
  });

};

export async function action({ params, request }) {
  const method = request.method;
  const data = await request.formData();
  console.log(data);
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/buku/" + data.get("id"), {
    method: method,
    headers: {
      Authorization: "Bearer",
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete book." },
      {
        status: 500,
      }
    );
  }
  return redirect("/admin/books");
}
