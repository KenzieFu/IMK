import BarcodeScannerComponent from "react-qr-barcode-scanner";
import React, { useRef } from 'react'
import { Form, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { json } from "react-router-dom";
export const ScanBarcode = ({onClose,item,tipe}) => {
  
  const location =useLocation();
  const navigate=useNavigate();
  const notifySuccessBook = () => toast.success('Buku Diterima Siswa Untuk Dipinjam', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  const notifyCompleteBook = () => toast.success('Buku Telah Dikembalikan', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  const notifyErrorBook = () => toast.error('Buku tidak Sesuai dengan Yang Dibooking Siswa', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  const notifyErrorCompleteBook = () => toast.error('Buku Yang Ingin Dikembalikan Tidak Sesuai', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
  const notifyBookNotFound = (text) => toast.error(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });


  
    const [data, setData] = React.useState("Not Found");
    const formRef=useRef();
    const check=(barcode)=>{
      
      return item.buku.barcode === barcode;
    }

  


    const createPinjamHandler=async(code)=>{
      console.log(code);
      console.log(item.id_siswa);
            const response = await fetch('http://localhost:8080/perpustakaan-methodist-cw/peminjamanBarcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer"
      },
      body: JSON.stringify({
        id_siswa: item.id_siswa,
        barcode: code

      })
    })
    const message=await response.json()
    if(response.status ===501)
    {
      notifyBookNotFound(message.message)
      onClose();
      navigate(location.pathname)

    }
    else{
      notifySuccessBook()
      onClose();
      navigate(location.pathname)
    }

    
    
    }


    const completeHandler=async(text)=>{
      const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman/' +item.id_peminjaman, {
        method: "POST",
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
      notifyCompleteBook()
      onClose();
      navigate(location.pathname);
    }

    
 

    const bookingHandler=async()=>{
       
      const response = await fetch('http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/' +item.id_pemesanan , {
    method: "Delete",
    headers: {
      "Authorization": "Bearer"
    }
  });

  if (!response.ok) {
    notifyErrorBook()
  }
    notifySuccessBook();
    onClose();
    navigate(location.pathname);
    }


  return (
    <>
    <Form>
    <div>
    <BarcodeScannerComponent
        width={700}
        height={500}
        onUpdate={(err, result) => {
          if (result){
                  if(tipe ==="booking")
                  {
                    if(check(result?.text))
                     {
                        bookingHandler(result?.text)
                     }
                     else{
                      console.log("error")
                      notifyErrorBook()
                      onClose();
                       }
                    
                  }
                  else if(tipe ==="create-pinjam")
                  {
                    console.log("Idhifw")
                    createPinjamHandler(result?.text);
                  }
                  else if(tipe==="selesaikan")
                  {
                        if(check(result?.text))
                        {
                          completeHandler(result?.text)
                        }
                        else{
                        console.log("error")
                        notifyErrorCompleteBook()
                        onClose();
                          }
                  }
              
             
          } 
          else
          {
            console.log("burss")
          }
       
        }}
      />
      <p>{data}</p>
      <button onClick={onClose}>Cancel</button>
    </div>
    </Form>
   

        
    </>
  )
}



/* //Konfirmasi Booking
 export async function action({ params, request }) {

  const method = request.method;
  const data = await request.formData();
  console.log(data);
  const response = await fetch('http://localhost:8080/perpustakaan-methodist-cw/pemesanan-buku/' + data.get('id'), {
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
  return redirect("/admin/booked-books");
} */




/* //Kembalikan Buku Perpus
\
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
} */

