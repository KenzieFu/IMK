import { CartProvider, useCart } from "react-use-cart";
import Modal from "../UI/Modal";
import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import { Button } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./BookCart.module.css";

export default function Cart(props) {
    const location=useLocation();
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
    const bookingAda = () => toast.error('Kamu sudah pesan buku ini! Ayo segera ambil di perpustakaan!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    const cartPeminjamanMax = () => toast.warning("Pemesanan buku sudah mencapai batas maksimal, Anda hanya dapat meminjam buku maksimal 3 eksemplar"
    , {
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

                const length=bukuId.length +
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



                if(response.status === 500)
                {
                    cartPeminjamanMax()

                    return
                }
                if(response.status === 501)
                {
                    bookingAda()
                    //remove item
                    const resData=await response.data
                    items.filter(item=>item.id)
                    emptyCart();
                    return
                }

                console.log(tes)
                const createdData = await response.json();

                console.log('Data created:', createdData);
                emptyCart()
                sukses()
                navigate(location.pathname);

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
                        <div className={classes['vectorimg']}></div>
                        <p>Yah, keranjangmu kosong nih :(</p>
                        <span>Yuk liat-liat perpustakaan </span>

                    </div> :
                    <>
                        <h1 className={classes['judulall']}> Daftar Pemesanan <span>{totalUniqueItems}</span></h1>

                        <div className={classes['divpenuh']}>
                            {items.map((item) => (
                                <>
                                    <div className={classes['maincontent']} key={item.id} style={{  }}>
                                        <div className={classes['gambarnya']}>
                                        <img src={`http://localhost:8080${item.gambar}`} className={classes['imgall']} />
                                        </div>
                                        <div className={classes['tablecon']}>
                                            <table>

                                                    <div className={classes['titletop']}>
                                                        <div className={classes['garismerah']}></div>
                                                        <h1>
                                                        {item.name}
                                                        </h1>
                                                    </div>
                                                <tr>
                                                    <th>
                                                        Genre
                                                    </th>

                                                    <td>
                                                        : &nbsp; {item.genre}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Pengarang
                                                    </th>

                                                    <td>
                                                        : &nbsp; {item.pengarang}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>
                                                        Penerbit
                                                    </th>
                                                    <td>
                                                        : &nbsp; {item.penerbit}
                                                    </td>
                                                </tr>

                                                {hidden && item.price}
                                            </table>
                                        </div>
                                </div>
                                    <div style={{display:"flex", flexDirection:"column"}}>
                                    <div className={classes['penutong']}>
                                    <p> Buku sudah ditambahkan ke booking list!</p>
                                    <button className={classes['tong']} onClick={() => { removeItem(item.id); notify() }}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                    </div>
                                    <div className={classes['hrline']}></div>
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
                }
                <div className={classes['buttonbatch']}>
                    <Button className={classes.buttclose} onClick={props.onClose}><i class="fa fa-times" aria-hidden="true"></i> Tutup</Button>
                    <Button className={classes.buttopen} onClick={bookingHandler} >{isEmpty ? "Ke Perpus!" : "Pesan !"}</Button>
                </div>
            </Modal>
        </>
    );
}