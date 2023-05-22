import { useState } from 'react';
import { Form, Link, json, redirect, useActionData, useNavigate, useNavigation, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { Button, FormGroup, FormText, Input, Label } from 'reactstrap';



function BookForm({method,book}) {

<<<<<<< HEAD

  
=======
>>>>>>> 9b2331c983d5d539b02d2d468063314947a4e9c7
  const navigate=useNavigate();
  const backHandler=()=>{
    navigate("..");
  }

  
  return (
    <>
      <Form method={method}>
              <h2>Id Buku : {book.id_buku}</h2>
              <input hidden name='id_buku' value={book.id_buku} />
              <FormGroup>
                <Label for="exampleBook">Judul Buku</Label>
                <Input
                  defaultValue={book.judul_buku??null}
                  id="exampleBook"
                  name="judul_buku"
                  placeholder={book.judul_buku??null}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePengarang">Pengarang</Label>
                <Input
                  defaultValue={book.pengarang??null}
                  value={book.pengarang??null}
                  id="examplePengarang"
                  name="pengarang"
                  placeholder={book.pengarang??null}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePenerbit">Penerbit</Label>
                <Input
                  defaultValue={book.penerbit??null}
                  value={book.penerbit??null}
                  id="examplePenerbit"
                  name="penerbit"
                  placeholder={book.penerbit??null}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="tahunTerbit">Tahun Terbit</Label>
                <Input
                  defaultValue={book.tahun_terbit??null}
                  value={book.tahun_terbit??null}
                  id="tahunTerbit"
                  name="tahun_terbit"
                  placeholder={book.tahun_terbit??null}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label for="tahunTerbit">Kategori</Label>
                <select value="">
                  <option value={book.kategori.nama_kategori} >Pilih Kategori</option>
                      {book.map((book) => (
                      <option key={book.id_kategori} value={book.kategori.nama_kategori}>
                    {book.kategori.nama_kategori}
                  </option>
              ))}
            </select>
              </FormGroup>
              <FormGroup>
                <Label for="sinopsis">Sinopsis</Label>
                <Input
                  defaultValue={book.sinopsis??null}
                  value={book.sinopsis??null}
                  id="sinopsis"
                  name="sinopsis"
                  placeholder={book.sinopsis??null}
                  type="textarea"
                  rows={10}
                  cols={10}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleIsbn">ISBN</Label>
                <Input
                  defaultValue={book.isbn??null}
                  value={book.isbn??null}
                  id="exampleIsbn"
                  name="isbn"
                  placeholder={book.isbn??null}
                  type="text"
                />
              </FormGroup>

              <Button onClick={backHandler}>Cancel</Button>
              <Button style={{ background:"green" }}>Save</Button>

            </Form>
    </>
  );
}

export default BookForm;


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const bukuData = {
    id_buku: data.get('id_buku'),
    judul_buku: data.get('judul_buku'),
    pengarang: data.get('pengarang'),
    penerbit: data.get('penerbit'),
    tahun_terbit: data.get('tahun_terbit'),
    sinopsis: data.get('sinopsis'),
    isbn: data.get('isbn'),
  };

  let url = 'http://localhost:8080/admin-perpustakaan-methodist-cw/buku';

  if (method === 'PUT') {
    const id = params.bookId;
    url = 'http://localhost:8080/admin-perpustakaan-methodist-cw/buku/' + id;
  }


  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      "Authorization":"Bearer"
    },
    body: JSON.stringify(bukuData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save book.' }, { status: 500 });
  }

  return redirect('..');
}
