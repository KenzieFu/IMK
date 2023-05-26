import React, { useState, useEffect } from "react";
import { Form, Link, json, redirect, useActionData, useNavigate, useNavigation, useRouteLoaderData, useSearchParams } from "react-router-dom";
import axios from "axios"
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { Button, FormGroup, FormText, Input, Label } from "reactstrap";
import classes from './adminbatch.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreateBuku = () => {
  const [formData, setFormData] = useState({
    id_buku: "7",
    judul_buku: "",
    pengarang: "",
    penerbit: "",
    tahun_terbit: "",
    id_kategori: "",
    sinopsis: "",
    gambar_buku: null,
    isbn: "",
  });

  const notify = () => toast.success('Buku berhasil ditambahkan', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});

  // const formik = useFormik({
  //   initialValues: {
  //     judul_buku: "",
  //     pengarang: "",
  //     penerbit: "",
  //     tahun_terbit: "",
  //     sinopsis: "",
  //     gambar_buku: null,
  //     isbn: "",
  //   }
  // })

  // validationSchema: Yup.object({
  //   judul_buku: Yup.string().required("Judul harus diisi"),
  //   pengarang: Yup.string().required("Nama pengarang harus diisi"),
  //   penerbit: Yup.string().required("Nama penerbit harus diisi"),
  //   tahun_terbit: Yup.string().min(4, "Tahun terbit tidak boleh kurang dari 4 digit").max(4, "Tahun terbit tidak boleh lebih dari 4 digit").required("Data harus diisi"),
  //   sinopsis: Yup.string().required("Data harus diisi"),
  //   isbn: Yup.string().required("Data harus diisi")
  // })

  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response1 = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/buku"); // Replace with your API endpoint for table 1
      const response2 = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/kategori"); // Replace with your API endpoint for table 2

      const data1 = await response1.json();
      const data2 = await response2.json();

      const optionsData = mergeOptions(data1, data2);
      setKategori(data2);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const mergeOptions = (data1, data2) => {
    // Assuming each data item has "id" and "label" properties
    const mergedOptions = [...data1, ...data2];
    return mergedOptions;
  };

  const handleOptionChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      gambar_buku: event.target.files[0],
    });
  };

  // const handleChange = (event) => {
  //   if (event.target.type === 'file') {
  //     setFormData({ ...formData, [event.target.name]: event.target.files[0] });
  //   } else {
  //     setFormData({ ...formData, [event.target.name]: event.target.value });
  //   }
  // };

  // const handleInputChange = (event) => {
  //   setFormData({
  //     ...formData,
  //     [event.target.judul_buku]: event.target.value,
  //     [event.target.pengarang]: event.target.value,
  //     [event.target.penerbit]: event.target.value,
  //     [event.target.gambar]: event.target.value,
  //     [event.target.tahun_terbit]: event.target.value,
  //     [event.target.sinposis]: event.target.value,
  //     [event.target.isbn]: event.target.value
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData(); 
      formDataToSend.append('judul_buku', formData.judul_buku);
      formDataToSend.append('pengarang', formData.pengarang);
      formDataToSend.append('penerbit', formData.penerbit);
      formDataToSend.append('tahun_terbit', formData.tahun_terbit);
      formDataToSend.append('gambar_buku', formData.gambar_buku)
      formDataToSend.append('id_kategori', formData.id_kategori)
      formDataToSend.append('sinopsis', formData.sinopsis);
      formDataToSend.append('isbn', formData.isbn); 

      // const sendedData={
      //   judul_buku:formData.judul_buku,
      //   pengarang:formData.pengarang,
      //   penerbit:formData.penerbit,
      //   tahun_terbit:formData.tahun_terbit,
      //   gambar_buku:formData.gambar_buku,
      //   id_kategori: formData.id_kategori,
      //   sinopsis:formData.sinopsis,
      //   isbn:formData.isbn
      // }

     const response= await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/buku', {
        method: 'POST',
      //   headers: {
      //      "Content-Type": "multipart/form-data",
      //      // boundry
      //     //  "Content-Type": "multipart/form-data ; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
      //  },
        // body:sendedData,
        body: formDataToSend,

      }); 
      // console.log semua data yang dikirimkan

      setFormData({
            id_buku: '',
            judul_buku: '',
            pengarang: '',
            penerbit: '',
            tahun_terbit: '',
            id_kategori: '',
            sinopsis: '',
            gambar_buku: '',
            isbn: ''
          });

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const navigate = useNavigate();
  const backHandler = () => {
    navigate("..");
  };

  return (
    <>
      <Form enctype="multipart/form-data"  onSubmit={handleSubmit} className={classes['form']}>
      <h2 className={classes['judul1']}>Create Buku</h2>
      <div className={classes['form-grup']}>
        <FormGroup>
          <Label className={classes['label']} for="exampleBook">judul Buku</Label>
          <Input className={classes['input']} id="exampleBook" name="judul_buku" placeholder="Masukkan judul Buku" type="text" value={formData.judul_buku}  onChange={handleInputChange} />
          {/* {errors.judul_buku && <span>{errors.judul_buku.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label className={classes['label']} for="examplePengarang">Pengarang</Label>
          <Input className={classes['input']} id="examplePengarang" name="pengarang" placeholder="Masukkan Nama Pengarang" type="text" value={formData.pengarang} onChange={handleInputChange} />
          {/* {errors.pengarang && <span>{errors.pengarang.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label className={classes['label']} for="examplePenerbit">Penerbit</Label>
          <Input
            id="examplePenerbit"
            name="penerbit"
            placeholder="Masukkan Nama Penerbit"
            type="text"
            onChange={handleInputChange}
            className={classes['input']}
            value={formData.penerbit}
          />
          {/* {errors.penerbit && <span>{errors.penerbit.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label className={classes['label']} for="tahun_terbit">Tahun Terbit</Label>
          <Input className={classes['input']} id="tahun_terbit" name="tahun_terbit" placeholder="Tahun tebrit" type="text" value={formData.tahun_terbit}  onChange={handleInputChange} />
          {/* {errors.tahun_terbit && <span>{errors.tahun_terbit.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label className={classes['label']} for="kategori">Kategori Buku</Label>
          <select style={{marginLeft: 13, width: 150, height: 30, borderRadius: 3}} name="id_kategori" value={formData.id_kategori} onChange={handleOptionChange} required>
            <option value={kategori.id_kategori}>Pilih Kategori</option>
            {kategori.map((kategori) => (
              <option key={kategori.nama_kategori} value={kategori.id_kategori}>
                {kategori.nama_kategori}
              </option>
            ))}
          </select>
          {/* {errors.tahun_terbit && <span>{errors.tahun_terbit.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label className={classes['label']} for="examplegambar">Gambar</Label>
          {/* file upload */}
          <Input className={classes['input']} id="examplegambar" name="gambar_buku" type="file" onChange={handleFileChange} />
          {/* {errors.gambar_buku && <span>{errors.gambar_buku.message}</span>} */}
        </FormGroup>

        <FormGroup>
          <Label className={classes['label']} for="sinopsis">Sinopsis</Label>
          <Input  id="sinopsis" name="sinopsis" placeholder="Silahkan Tulis Sinopsis Secara Singkat" value={formData.sinopsis} type="textarea" rows={10} cols={10} onChange={handleInputChange} />
          {/* {errors.sinopsis && <span>{errors.sinopsis.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label className={classes['label']} for="exampleIsbn">ISBN</Label>
          <Input className={classes['input']} id="exampleIsbn" name="isbn" placeholder="ISBN Buku" type="text" value={formData.isbn} onChange={handleInputChange} />
          {/* {errors.isbn && <span>{errors.isbn.message}</span>} */}
        </FormGroup>
        </div>
        <div className={classes['batchbut1']}>
        <Button onClick={backHandler} className={classes['delbut']}>Cancel</Button>
        <Button className={classes['savbut']} type="submit" onClick={notify}>
          Simpan
        </Button>
        </div>
      </Form>
    </>
  );
};