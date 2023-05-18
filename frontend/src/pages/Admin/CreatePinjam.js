import React, {Suspense, useState} from 'react';
import { Await, Form, Link, defer, json, redirect, useActionData, useLoaderData, useNavigate, useNavigation, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { Button, FormGroup, FormText, Input, Label } from 'reactstrap';
import Select from 'react-select';

export const CreatePinjam = () => {
  const {daftarBuku, daftarSiswa} = useLoaderData('create-pinjam')
  const mapBukuToOptions = (bukuData) => {
    return bukuData.map((buku) => ({
      label: buku.judul_buku,
      value: buku.id_buku
    }));
  };

  const mapSiswaToOptions = (siswaData) => {
    return siswaData.map((siswa) => ({
      label: siswa.nama_lengkap,
      value: siswa.id_siswa
    }));
  };


  const [formData, setFormData] = useState({
    judul_buku: '',
    pengarang: '',
    penerbit: '',
    gambar_buku: null,
    tahun_terbit: '',
    sinposis: '',
    isbn: ''
  })

  const handleInputChange = (event) => {
    if (event.target.name === 'gambar_buku') {
      setFormData({
        ...formData,
        gambar_buku: event.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [event.target.judul_buku]: event.target.value,
        [event.target.pengarang]: event.target.value,
        [event.target.penerbit]: event.target.value,
        [event.target.gambar]: event.target.value,
        [event.target.tahun_terbit]: event.target.value,
        [event.target.sinposis]: event.target.value,
        [event.target.isbn]: event.target.value
      });
    }
  };



  const handleCreate = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('judul_buku', formData.judul_buku);
      formDataToSend.append('pengarang', formData.pengarang);
      formDataToSend.append('gambar_buku', formData.gambar_buku);
      formDataToSend.append('penerbit', formData.penerbit);
      formDataToSend.append('tahun_terbit', formData.tahun_terbit);
      formDataToSend.append('sinopsis', formData.sinopsis);
      formDataToSend.append('isbn', formData.isbn);

      const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/buku/', {
        method: 'POST',
        body: formDataToSend
      });

      const createdData = await response.json();
      console.log('Data created:', createdData);

      // Reset the form after successful creation
      setFormData({
        judul_buku: '',
        pengarang: '',
        penerbit: '',
        gambar_buku: null,
        tahun_terbit: '',
        sinposis: '',
        isbn: ''
      });
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };


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

  // const handleCreate = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/buku', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(formData)
  //     });
  //     const createdData = await response.json();
  //     console.log('Data created:', createdData);
  //     // Reset the form after successful creation
  //     setFormData({
  //       judul_buku: '',
  //       pengarang: '',
  //       penerbit: '',
  //       gambar_buku: null,
  //       tahun_terbit: '',
  //       sinposis: '',
  //       isbn: ''

  //     });
  //   } catch (error) {
  //     console.error('Error creating data:', error);
  //   }
  // };

  // const [judul_buku, setjudul_buku] = useState('');
  // const [pengarang, setpengarang] = useState('');
  // const [penerbit, setpenerbit] = useState('');
  // const [gambar, setGambar] = useState('');
  // const [tahun_terbit, settahun_terbit] = useState('');
  // const [sinposis, setSinopsis] = useState('');
  // const [isbn, setIsbn] = useState('');

  const navigate=useNavigate();
  const backHandler=()=>{
    navigate("..");
  }

  // const postData= () => {
  //   console.log(judul_buku);
  //   console.log(pengarang);
  //   console.log(penerbit);
  //   console.log(tahun_terbit);
  //   console.log(sinposis);
  //   console.log(isbn);

  // }

  return (
    <>
      <h2>Create Pinjam</h2>
        <Form>
        <FormGroup>
          <Label for="exampleBook">Judul Buku</Label>
          <Suspense fallback="Loading...">
      <Await resolve={daftarBuku}>
        {(bukuData) => (
          <Select options={mapBukuToOptions(bukuData)} />
        )}
      </Await>
    </Suspense>
        </FormGroup>
        <FormGroup>
          <Label for="examplePengarang">Nama Siswa</Label>
          <Suspense fallback="Loading...">
      <Await resolve={daftarSiswa}>
        {(siswaData) => (
          <Select options={mapSiswaToOptions(siswaData)} />
        )}
      </Await>
    </Suspense>
        </FormGroup>
        <FormGroup>
          <Label for="examplePenerbit">Tanggal pinjam</Label>
          <Input
            id="examplePenerbit"
            name="penerbit"
            placeholder="Masukkan Nama Penerbit"
            type="date"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplegambar">Tanggal kembali</Label>
          <Input
            id="examplegambar"
            name="gambar_buku"
            type="file"
            onChange={handleInputChange}
          />
        </FormGroup>
          <Button onClick={backHandler}>Cancel</Button>
          <Button style={{ background:"green" }} onClick={handleCreate}>Save</Button>
      </Form>
    </>
  )
}

const loadBuku=async ()=>{
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/buku")
  console.log(response);
  if(!response.ok)
  {
    throw json(
      { message: 'Could not fetch peminjaman.' },
      {
        status: 500,
      }
    );
  }

  else{
    const resData=await response.json();
    return resData;
  }
}

const loadSiswa=async ()=>{
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/siswa")
  console.log(response);
  if(!response.ok)
  {
    throw json(
      { message: 'Could not fetch peminjaman.' },
      {
        status: 500,
      }
    );
  }

  else{
    const resData=await response.json();
    return resData;
  }
}
export const loader=()=>{
  return defer({
    daftarBuku:loadBuku(),
    daftarSiswa:loadSiswa()
  })
}
