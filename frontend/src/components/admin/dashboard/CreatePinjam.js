import React, {Suspense, useState} from 'react';
import { Await, Form, Link, defer, json, redirect, useActionData, useLoaderData, useNavigate, useNavigation, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { Button, FormGroup, FormText, Input, Label } from 'reactstrap';
import Select from 'react-select';

export const CreatePinjam = () => {
  const {daftarBuku, daftarSiswa} = useLoaderData('create-pinjam')
  const [selectedBuku, setSelectedBuku] = useState('')
  const [selectedSiswa, setSelectedSiswa] = useState('')


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



  const handleSelectChangeBuku = (selectedOption) => {
    setSelectedBuku(selectedOption.value);
  };
  const handleSelectChangeSiswa = (selectedOption) => {
    setSelectedSiswa(selectedOption.value);
  };


  const handleCreate = async () => {
    try {

      const response = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/peminjaman', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization":"Bearer"
        },
        body: JSON.stringify({
          id_siswa: selectedSiswa,
          id_buku: selectedBuku

        })
      });

      const createdData = await response.json();
      console.log('Data created:', createdData);

      // Reset the form after successful creation

    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const navigate=useNavigate();
  const backHandler=()=>{
    navigate("..");
  }


  return (
    <>
      <h2>Create Pinjam</h2>
        <Form onSubmit={handleCreate}>
        <FormGroup>
          <Label for="exampleBook">Judul Buku</Label>
          <Suspense fallback="Loading...">
      <Await resolve={daftarBuku}>
        {(bukuData) => (
          <Select name="judul_buku" options={mapBukuToOptions(bukuData)} onChange={handleSelectChangeBuku}/>
        )}
      </Await>
    </Suspense>
        </FormGroup>
        <FormGroup>
          <Label for="examplePengarang">Nama Siswa</Label>
          <Suspense fallback="Loading...">
      <Await resolve={daftarSiswa}>
        {(siswaData) => (
          <Select name="nama_siswa" options={mapSiswaToOptions(siswaData)} onChange={handleSelectChangeSiswa}/>
        )}
      </Await>
    </Suspense>
        </FormGroup>
          <Button onClick={backHandler}>Cancel</Button>
          <Button style={{ background:"green" }} type="submit">Save</Button>
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
