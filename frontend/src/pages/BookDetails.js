import React from "react";
import { Sidebar } from "../UI/Sidebar";
import classes from "./BookDetails.module.css"
import { SearchBox } from '../UI/SearchBox'
import { SearchResult } from '../components/SearchResult'
import { useState } from "react";
import { defer, json, useLoaderData, useNavigate, useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginModal from "../components/auth/Login";
import { BookingModals } from "../components/BookingModal";
import { CartProvider, useCart } from "react-use-cart";
import Modal from "../UI/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BookDetail = () => {

    const notify = () => toast.success('Buku berhasil ditambahkan ke booking list!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const gagal = () => toast.warning('Buku sudah ada di booking list!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const isAuth = useSelector((state) => state.auth.isAuth);
    const akun = useSelector((state) => state.auth.user);
    const [isAdded, setIsAdded] = useState(false);
    const { addItem, items, inCart } = useCart();
    // console.log(items)
    console.log(akun)

    // console.log(userItems)
    const navigate = useNavigate();


    const { book } = useLoaderData('book-detail');
    const backHandler = () => {
        navigate("..");
    }

    const handleAddToCart = () => {
        const userItems = items.filter((item) => item.id_akun === akun.user.id_siswa);
        const existingItem =  inCart(book.id_buku)
        console.log(existingItem )

        if (existingItem) {
            gagal()
        } else {

            addItem({
                id: book.id_buku,
                name: book.judul_buku,
                price: "--",
                penerbit: book.penerbit,
                pengarang: book.pengarang,
                sinopsis: book.sinopsis,
                id_akun: akun.user.id_siswa
            });
            notify()

        }
    };

    const [showBookingModal, setBookingModal] = useState(false)
    const [showLogin, setShowLogin] = useState(false);


    const showLoginModal = () => {
        setShowLogin(true);
    }
    const closeLoginModal = () => {
        setShowLogin(false);
    }
    // const showBookingModalHandler = (id) => {
    //     setBookingModal(true);

    // }
    // const closeBookingModalHandler = (id) => {
    //     setBookingModal(false);

    // }
    return (
        <>

            <div className={classes.layout}>
            {isAuth && <Sidebar />}   
                    <div className={classes.content}>   
                        <div className={classes.cardtopmain}>
                        <div className={classes.cardtop}>   
                        <div className={classes.covertop}>
                            <div className={classes['texttop']}>
                                <h1>Yuk Baca Buku!</h1>
                                <span>Perpustakaan Methodist Charles Wesley tersedia 100+ buku yang bisa diakses kapan saja.</span>
                            </div>
                        </div> 
                        <div className={classes.card}>

                            {/*  <div className={classes.hero}>
                                <img src="../assets/hero-details-books.jpg"></img>
                            </div> */}
                            <div className={classes.cover}>
                                <img src="../assets/BookCover.png"></img>
                            </div>

                            <div className={classes.book_info}>
                                <h2>{book.judul_buku}</h2>
                                <div className={classes.summary}>
                                    {/* <h3>Sinopsis</h3> */}
                                    <p>{book.sinopsis}</p>
                                </div>
                                <div className={classes.infotable}>
                                <table>
                                    <tr>
                                        <td>Penulis</td>
                                        <td style={{width:"5vw"}}>:</td>
                                        <td style={{ color: "#3a3a3a", fontWeight: "500", width:"20vw" }}>{book.pengarang}</td>
                                    </tr>
                                    <tr>
                                        <td>Penerbit</td>
                                        <td style={{width:"5vw"}}>: &nbsp;</td>
                                        <td style={{ color: "#3a3a3a", fontWeight: "500", width:"20vw" }}>{book.penerbit}</td>
                                    </tr>
                                    <tr>
                                        <td>Tahun</td>
                                        <td style={{width:"5vw"}}>: &nbsp;</td>
                                        <td style={{ color: "#3a3a3a", fontWeight: "500", width:"20vw" }}>{book.tahun_terbit}</td>
                                    </tr> 
                                    <tr>
                                        <td>ISBN</td>
                                        <td style={{width:"5vw"}}>: &nbsp;</td>
                                        <td style={{ color: "#3a3a3a", fontWeight: "500", width:"20vw" }}>{book.isbn}</td>
                                    </tr>
                                    <tr>
                                        <td>Genre</td>
                                        <td style={{width:"5vw"}}>: &nbsp;</td>
                                        <td style={{ color: "#3a3a3a", fontWeight: "500", width:"20vw" }}>{book.kategori.nama_kategori}</td>
                                    </tr>
                                </table>
                                <button className={classes["button-back"]} onClick={backHandler}>Kembali</button>
                                {/* button ini belum jalan seperti semestinya */}
                                {showLogin && <LoginModal onClose={closeLoginModal} />}
                                {/* {showBookingModal && <BookingModals onClose={closeBookingModalHandler} id={book.id_buku} judulBuku={book.judul_buku}/>} */}
                                <button className={classes["button-borrow"]} onClick={() => {
                                    if (!isAuth) {
                                        showLoginModal();
                                    } else {
                                        handleAddToCart();
                                    }
                                }}
                                >  {!isAdded ? "Pinjam Buku" : "✔ Telah Dibooking"}</button>
                            </div>
                            </div>
                        </div>

                    </div>
                    </div>
                </div>

            </div>
                   
            
        </>
    )
}

export default BookDetail

const loadBook = async (id) => {
    const response = await fetch("http://localhost:8080/perpustakaan-methodist-cw/buku/" + id)
    console.log(response);
    if (!response.ok) {
        throw json(
            { message: 'Could not fetch events.' },
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

export async function loader({ request, params }) {
    const id = params.bookId;

    return defer({
        book: await loadBook(id),
    });
}