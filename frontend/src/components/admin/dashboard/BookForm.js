import { useState, useEffect } from 'react';
import { Form, Link, json, redirect, useActionData, useNavigate, useNavigation, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { Button, FormGroup, FormText, Input, Label } from 'reactstrap';



function BookForm({method,book}) {

  const navigate=useNavigate();
  const backHandler=()=>{
    navigate("..");
  }

  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const response1 = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/buku'); // Replace with your API endpoint for table 1
      const response2 = await fetch('http://localhost:8080/admin-perpustakaan-methodist-cw/kategori'); // Replace with your API endpoint for table 2

      const data1 = await response1.json();
      const data2 = await response2.json();

      const optionsData = mergeOptions(data1, data2);
      setKategori(optionsData);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const mergeOptions = (data1, data2) => {
    // Assuming each data item has "id" and "label" properties
    const mergedOptions = [...data1, ...data2];
    return mergedOptions;
  };


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
                <select value={kategori.nama_kategori}>
                  <option value={kategori.nama_kategori} >Pilih Kategori</option>
                      {kategori.map((kategori) => (
                      <option key={kategori.id_kategori} value={kategori.nama_kategori}>
                    {kategori.nama_kategori}
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
              <Button type='submit' style={{ background:"green" }}>Save</Button>

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
