import { CartProvider, useCart } from "react-use-cart";
import Modal from "../UI/Modal";
import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import classes from "./BookCart.module.css";

export default function Cart(props) {

    const authen = useSelector(state => state.auth.isAuth);
    const akun = useSelector((state) => state.auth.user)
    const navigate = useNavigate();

    console.log(akun)
    const {
        isEmpty,
        totalUniqueItems,
        items,
        removeItem,
        emptyCart
    } = useCart();

    const notify = () => toast.success('Buku berhasil dihapus dari booking list!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const sukses = () => toast.success('Buku berhasil dibooking!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const error = () => toast.error('Buku tidak berhasil dibooking :(', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const cartKosong = () => toast.warning('Booking Listmu masih kosong! Ayo isi sekarang!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const [hidden, setHidden] = React.useState(false)

    const bookingHandler = async (onClose) => {



        let url = 'http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku-multiple';

        try {
            if (isEmpty) {
                navigate('library')
                onClose()


            } else {
                let bukuId = []
                for (const item of items) {
                    bukuId.push(item.id)
                }

                const tes = {
                    id_siswa: akun.user.id_siswa,
                    id_buku: bukuId
                }
                console.log(bukuId)
                console.log(akun.user.id_siswa)
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer"
                    },
                    body: JSON.stringify(tes)
                });

                console.log(tes)
                const createdData = await response.json();

                console.log('Data created:', createdData);
                emptyCart()
                sukses()
            }

        } catch (error) {
            console.error('Error creating data:', error);
            error()
        }

    }

    return (
        <>
            <Modal>
                {isEmpty ?
                    <div className={classes['mainall']}>
                        <p>Keranjangmu kosong.</p>
                        <i class="fa fa-shopping-basket" aria-hidden="true"></i>
                        <p style={{ fontFamily: "Inter", fontSize: "20px", marginTop: "20px", color: "#1c2431", fontWeight: "bolder" }}>Yuk ke perpus :.</p>

                    </div> :
                    <>
                        <h1 style={{ marginBottom:"20px",textAlign: "center" }}>Daftar Pemesanan ({totalUniqueItems})</h1>

                        <div className={classes['divpenuh']}>
                            {items.map((item) => (
                                <>
                                    <div className={classes['maincontent']} key={item.id} style={{  }}>
                                        <img src="../assets/BookCover.png" className={classes['imgall']} />
                                        <div>
                                            <table>
                                                <tr>
                                                    <td>
                                                        Judul Buku
                                                    </td>

                                                    <td>
                                                        :{item.name}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Genre
                                                    </td>

                                                    <td>
                                                        :{item.genre}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Pengarang
                                                    </td>

                                                    <td>
                                                        :{item.pengarang}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Penerbit
                                                    </td>
                                                    <td>
                                                        :{item.penerbit}
                                                    </td>

                                                </tr>
                                                <tr>
                                                    <td>
                                                        Sinopsis
                                                    </td>
                                                    <td style={{ width: "500px" }}>
                                                        :{item.sinopsis.substring(0, 100)}
                                                        <span style={{ color: "#2e55ba" }}>Cek selengkapnya...</span>
                                                    </td>
                                                </tr>
                                                {hidden && item.price}
                                            </table>
                                        </div>
                                </div>
                                    <div style={{display: "flex", alignItems:"flex-end"}}>
                                    <button style={{
                                        marginLeft: "auto",
                                        marginRight: "15px",
                                        padding: "10px",
                                        backgroundColor: "#ebedec",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5%",
                                        cursor: "pointer",
                                    }} onClick={() => { removeItem(item.id); notify() }}><i class="fa fa-trash" aria-hidden="true" style={{color:"black", fontSize:"30px"}}></i></button>
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
                }
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", marginTop: "20px", marginBottom: "20px" }}>
                    <Button style={{ backgroundColor: "#ebedec", color: "black", border: "0", marginRight: "10px" }} onClick={props.onClose}>Tutup</Button>
                    <Button style={{ backgroundColor: "#FF5959", color: "white", border: "0", marginLeft: "10px" }} onClick={()=> bookingHandler(props.onClose)} >{isEmpty ? "Ke Perpus!" : "Pesan!"}</Button>
                </div>
            </Modal>
        </>
    );
}