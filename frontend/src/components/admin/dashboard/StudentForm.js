import { useState } from 'react';
import { Form, Link, json, useSubmit, redirect, useActionData, useNavigate, useNavigation, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { Button, FormGroup, FormText, Input, Label } from 'reactstrap';
import classes from '../../../pages/Admin/adminbatch.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast.success('Data Siswa berhasil diperbaharui!', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
});

function StudentForm({method,student}) {
  const navigate=useNavigate();
  const backHandler=()=>{
    navigate("..");
  }
  const submit =useSubmit();

  const submitHandler=(e)=>{
    console.log("jasnofa");
    submit(e.currentTarget,{method:method})
  }
  return (
    <>
      <Form method={method} className={classes['form']}>
              <h2 className={classes['judul1']}>Id Siswa : {student.id_siswa}</h2>
              <input hidden name='id_siswa' value={student.id_siswa} />
              <div className={classes['from-grup']}>
              <FormGroup>
                <Label className={classes['label']} for="examplestudent">NISN</Label>
                <Input
                  defaultValue={student.nisn??null}
                  id="examplestudent"
                  name="nisn"
                  placeholder={student.nisn??null}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label className={classes['label']} for="examplestudent">Nama Siswa</Label>
                <Input
                  defaultValue={student.nama_lengkap??null}
                  id="examplestudent"
                  name="nama_lengkap"
                  placeholder={student.nama_lengkap??null}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label className={classes['label']} for="examplePassword">Jenis Kelamin</Label>
                <Input
                  defaultValue={student.jenis_kelamin??null}

                  id="examplejenis_kelamin"
                  name="jenis_kelamin"
                  placeholder={student.jenis_kelamin??null}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label className={classes['label']} for="examplePassword">Tempat Lahir</Label>
                <Input
                  defaultValue={student.tempat_lahir??null}

                  id="exampletempat_lahir"
                  name="tempat_lahir"
                  placeholder={student.tempat_lahir??null}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label className={classes['label']} for="examplePassword">Tanggal Lahir</Label>
                <Input
                  defaultValue={student.tanggal_lahir??null}

                  id="exampletanggal_lahir"
                  name="tanggal_lahir"
                  placeholder={student.tanggal_lahir??null}
                  type="date"
                />
              </FormGroup>
              <FormGroup>
                <Label className={classes['label']} for="hak_akses">Agama</Label>
                <Input  id="agama" name="agama" defaultValue={student.agama} type="select">
                <option   value="Kristen Protestan">Kristen Protestan</option>
                  <option  value="Islam">Islam</option>
                  <option  value="Khatolik">Khatolik</option>
                  <option  value="Hindu">Hindu</option>
                  <option  value="Buddha">Buddha</option>
                  <option  value="Konghucu">Konghucu</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label className={classes['label']} for="examplePassword">Alamat</Label>
                <Input
                  defaultValue={student.alamat??null}

                  id="examplealamat"
                  name="alamat"
                  placeholder={student.alamat??null}
                  type="textarea"
                />
              </FormGroup>
              <FormGroup>
                <Label className={classes['label']} for="examplePassword">Nomor telepon</Label>
                <Input
                  defaultValue={student.nomor_telepon??null}

                  id="examplenomor_telepon"
                  name="nomor_telepon"
                  placeholder={student.nomor_telepon??null}
                  type="number"
                />
              </FormGroup>
              <FormGroup>
                <Label className={classes['label']} for="examplePassword">Email</Label>
                <Input
                  defaultValue={student.email??null}

                  id="exampleemail"
                  name="email"
                  placeholder={student.email??null}
                  type="email"
                />
              </FormGroup>


              </div>

              <div/*  className={classes['batchbut1']} */>
              <Button onClick={backHandler} /* className={classes['delbut']} */>Batalkan</Button>
              <Button onClick={(e)=>submitHandler(e)}  /* className={classes['savbut']} */ >Simpan</Button>
              </div>

            </Form>
    </>
  );
}
export default StudentForm;


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  console.log("ajnfoaw")
  const siswaData = {
    id_siswa: data.get('id_siswa'),
    nama_lengkap: data.get('nama_lengkap'),
    nisn: data.get('nisn'),
    jenis_kelamin: data.get('jenis_kelamin'),
    tempat_lahir: data.get('tempat_lahir'),
    tanggal_lahir: data.get('tanggal_lahir'),
    agama: data.get('agama'),
    alamat: data.get('alamat'),
    nomor_telepon: data.get('nomor_telepon'),
    email: data.get('email'),

  };

  let url = 'http://localhost:8080/admin-perpustakaan-methodist-cw/siswa';

  if (method === 'PUT') {
    const id = params.idSiswa;
    url = 'http://localhost:8080/admin-perpustakaan-methodist-cw/siswa/' + id;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      "Authorization":"Bearer"
    },
    body: JSON.stringify(siswaData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save akun.' }, { status: 500 });
  }
  notify()
  return redirect('..');
}
