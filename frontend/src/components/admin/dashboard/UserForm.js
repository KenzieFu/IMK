import { useState } from 'react';
import { Form, Link, json, redirect, useActionData, useNavigate, useNavigation, useRouteLoaderData, useSearchParams } from 'react-router-dom';
import { Button, FormGroup, FormText, Input, Label } from 'reactstrap';
import classes from '../../../pages/Admin/adminbatch.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = () => toast.success('User berhasil diperbaharui!', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
});

function UserForm({method,user}) {

  const navigate=useNavigate();
  const backHandler=()=>{
    navigate("..");
  }
  return (
    <>
      <Form method={method} className={classes['form']}>
              <h2 className={classes['judul1']}>Id Akun : {user.id_akun}</h2>
              <input hidden name='id_akun' value={user.id_akun} />
              <div className={classes['from-grup']}>
              <FormGroup>
                <Label className={classes['label']} for="exampleUser">Username</Label>
                <Input
                  defaultValue={user.username??null}
                  id="exampleUser"
                  name="username"
                  placeholder={user.username??null}
                  type="text"
                />
              </FormGroup>
              <FormGroup>
                <Label className={classes['label']} for="examplePassword">Password</Label>
                <Input
                  defaultValue={user.password??null}
                 
                  id="examplePassword"
                  name="password"
                  placeholder={user.password??null}
                  type="password"
                />
              </FormGroup>

              <FormGroup>
                <Label className={classes['label']} for="hak_akses">Hak Akses</Label>
                <Input  id="hak_akses" name="hak_akses" defaultValue={user.hak_akses} type="select">
                <option   value="Siswa">Siswa</option>
                  <option  value="Admin">Admin</option>
                  <option  value="Kasir">Kasir</option>
                  <option  value="Petugas">Petugas</option>
                </Input>
              </FormGroup>
              </div>
              <div className={classes['batchbut1']}>
              <Button onClick={backHandler} className={classes['delbut']}>Batalkan</Button>
              <Button className={classes['savbut']}>Simpan</Button>
              </div>
            </Form>
    </>
  );
}
export default UserForm;


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  console.log("ajnfoaw")
  const akunData = {
    id_akun: data.get('id_akun'),
    username: data.get('username'),
    password: data.get('password'),
    hak_akses: data.get('hak_akses'),
  };

  let url = 'http://localhost:8080/admin-perpustakaan-methodist-cw/akun';

  if (method === 'PUT') {
    const id = params.idAkun;
    url = 'http://localhost:8080/admin-perpustakaan-methodist-cw/akun/' + id;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      "Authorization":"Bearer"
    },
    body: JSON.stringify(akunData),
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
