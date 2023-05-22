import { CartProvider, useCart } from "react-use-cart";
import Modal from "../UI/Modal";
import React, { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";

export default function Cart(props) {

    const authen=useSelector(state=>state.auth.isAuth);
    const akun=useSelector((state)=>state.auth.user)
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

const bookingHandler = async () => {
  let url = 'http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku';

  try {

    if(totalUniqueItems === 0){
        cartKosong()
    } else {
        let tes = []

     for (const item of items) {
        const currentTime = new Date().toLocaleTimeString();
        const currentDate = new Date().toLocaleDateString();

        const gass = {
          id_siswa: akun.user.id_siswa,
          id_buku: item.id,
          waktu: currentTime,
          tanggal: currentDate
        };
        tes.push(gass)
    }
    console.log(tes)
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer"
        },
        body: JSON.stringify(tes)

      });
      const createdData = await response.json();

      console.log('Data created:', createdData);
      sukses()

    }

 } catch(error) {
    console.error('Error creating data:', error);
    error()
  }

}

    return (
        <>
            <Modal>

            {isEmpty  ? <p>Your cart is empty</p> :
                    <>
                        <h1>Cart ({totalUniqueItems})</h1>

                        <ul>
                            {items.map((item) => (
                                <li key={item.id}>
                                    <table>
                                    <td>
                                        <tr>
                                        {item.name}
                                        </tr>

                                        <tr>
                                        {item.pengarang}
                                        </tr>

                                        <tr>
                                        {item.penerbit}
                                        </tr>
                                    </td>
                                    {/* <td>
                                        <tr>
                                        {item.sinopsis}
                                        </tr>
                                    </td> */}
                                    {hidden && item.price}
                                    </table>
                                    {/* <button
                                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                    >
                                    </button>
                                    <button
                                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button> */}
                                    <button onClick={() => {removeItem(item.id); notify()}}>&times;</button>
                                </li>
                            ))}
                        </ul>
                    </>
                }
                <button onClick={props.onClose}>Close</button>
                <button onClick={bookingHandler}>Booking!</button>
            </Modal>
        </>
    );
}