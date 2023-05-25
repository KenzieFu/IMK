import React, { useState, useEffect } from "react";
import { Form, Link, json, redirect, useActionData, useNavigate, useNavigation, useRouteLoaderData, useSearchParams } from "react-router-dom";
import axios from "axios"
import { Button, FormGroup, FormText, Input, Label } from "reactstrap";
import classes from './adminbatch.module.css';

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

      const sendedData={
        judul_buku:formData.judul_buku,
        pengarang:formData.pengarang,
        penerbit:formData.penerbit,
        tahun_terbit:formData.tahun_terbit,
        gambar_buku:formData.gambar_buku,
        id_kategori: formData.id_kategori,
        sinopsis:formData.sinopsis,
        isbn:formData.isbn
      }

      console.log(sendedData);
     const response= await axios.post('http://localhost:8080/admin-perpustakaan-methodist-cw/buku',formDataToSend); // Replace with your API endpoint
      // console.log semua data yang dikirimkan

      alert("Form submitted successfully!");
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
          <Label for="exampleBook">judul Buku</Label>
          <Input id="exampleBook" name="judul_buku" placeholder="Masukkan judul Buku" type="text" onChange={handleInputChange} />
          {/* {errors.judul_buku && <span>{errors.judul_buku.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label for="examplePengarang">Pengarang</Label>
          <Input id="examplePengarang" name="pengarang" placeholder="Masukkan Nama Pengarang" type="text" onChange={handleInputChange} />
          {/* {errors.pengarang && <span>{errors.pengarang.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label for="examplePenerbit">Penerbit</Label>
          <Input
            id="examplePenerbit"
            name="penerbit"
            placeholder="Masukkan Nama Penerbit"
            type="text"
            onChange={handleInputChange}
          />
          {/* {errors.penerbit && <span>{errors.penerbit.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label for="tahun_terbit">Tahun Terbit</Label>
          <Input id="tahun_terbit" name="tahun_terbit" placeholder="Tahun tebrit" type="text" onChange={handleInputChange} />
          {/* {errors.tahun_terbit && <span>{errors.tahun_terbit.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label for="kategori">Kategori Buku</Label>
          <select name="id_kategori" value={formData.id_kategori} onChange={handleOptionChange} required>
            <option value="">Pilih Kategori</option>
            {kategori.map((kategori) => (
              <option key={kategori.nama_kategori} value={kategori.id_kategori}>
                {kategori.nama_kategori}
              </option>
            ))}
          </select>
          {/* {errors.tahun_terbit && <span>{errors.tahun_terbit.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label for="examplegambar">Gambar</Label>
          {/* file upload */}
          <Input id="examplegambar" name="gambar_buku" type="file" onChange={handleFileChange} />
          {/* {errors.gambar_buku && <span>{errors.gambar_buku.message}</span>} */}
        </FormGroup>

        <FormGroup>
          <Label for="sinopsis">Sinopsis</Label>
          <Input id="sinopsis" name="sinopsis" placeholder="Silahkan Tulis Sinopsis Secara Singkat" type="textarea" rows={10} cols={10} onChange={handleInputChange} />
          {/* {errors.sinopsis && <span>{errors.sinopsis.message}</span>} */}
        </FormGroup>
        <FormGroup>
          <Label for="exampleIsbn">ISBN</Label>
          <Input id="exampleIsbn" name="isbn" placeholder="ISBN Buku" type="text" onChange={handleInputChange} />
          {/* {errors.isbn && <span>{errors.isbn.message}</span>} */}
        </FormGroup>
        </div>
        <Button onClick={backHandler}>Cancel</Button>
        <Button style={{ background: "green" }} type="submit">
          Save
        </Button>
      </Form>
    </>
  );
};