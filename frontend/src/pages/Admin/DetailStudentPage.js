import React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '../../UI/Box'
import { Await, useRouteLoaderData, useNavigate } from 'react-router-dom'
import { json,defer } from 'react-router-dom'
import { Suspense } from 'react'
import classes from './adminbatch.module.css';
import { FormGroup } from 'reactstrap'

export const DetailStudentPage = () => {
  const { studentDetail }= useRouteLoaderData("detail-siswa");
  const navigate= useNavigate();
  const backHandler=()=>{
      navigate("..");
  }
  const editHandler=()=>{
      navigate(`/admin/students/${studentDetail.id_siswa}/edit`)
  }
  return (
    <>  <Suspense>
    <Await resolve={studentDetail}>
        {(loadedData)=>
            {
                return(
            <Box>

            <div  className={classes['form']}>
                <h1 className={classes['judul1']}>Data Siswa </h1>
                <div className={classes['table-grup']}>
                    <FormGroup style={{display: "block"}}>
                        <label className={classes['label']}>ID Akun</label>
                        <input style={{width: "97%", margin: "auto"}}  className={classes['input']} disabled value={loadedData.id_siswa} />
                    </FormGroup>
                    <FormGroup style={{display: "block"}}>
                        <label className={classes['label']}>Nama Lengkap</label>
                        <input style={{width: "97%", margin: "auto"}} className={classes['input']} disabled value={loadedData.nama_lengkap} />
                    </FormGroup>
                    <FormGroup style={{display: "block"}}>
                        <label className={classes['label']}>NISN</label>
                        <input style={{width: "97%", margin: "auto"}} className={classes['input']} disabled value={loadedData.nisn} />
                    </FormGroup>
                    <FormGroup style={{display: "block"}}>
                        <label className={classes['label']}>Tempat, tanggal lahir </label>
                        <input style={{width: "97%", margin: "auto"}} className={classes['input']} disabled value={`${loadedData.tempat_lahir}, ${loadedData.tanggal_lahir}`} />
                    </FormGroup>
                    <FormGroup style={{display: "block"}}>
                        <label className={classes['label']}>Agama</label>
                        <input style={{width: "97%", margin: "auto"}} className={classes['input']} disabled value={loadedData.agama} />
                    </FormGroup>
                    <FormGroup style={{display: "block"}}>
                        <label className={classes['label']}>Alamat</label>
                        <input style={{width: "97%", margin: "auto"}} className={classes['input']} disabled value={loadedData.alamat} />
                    </FormGroup>
                    <FormGroup style={{display: "block"}}>
                        <label className={classes['label']}>No Telepon</label>
                        <input style={{width: "97%", margin: "auto"}} className={classes['input']} disabled value={loadedData.nomor_telepon} />
                    </FormGroup>
                    <FormGroup style={{display: "block"}}>
                        <label className={classes['label']}>Email</label>
                        <input style={{width: "97%", margin: "auto"}} className={classes['input']} disabled value={loadedData.email} />
                    </FormGroup>
                </div>
                {/* <table style={{display: "flex", width: "97%", margin: "auto", flexDirection: "column"}}>
                            <div className={classes['table-icon']}>
                                <p><i class="bi bi-person-circle"></i> Id Akun</p>
                                <p><i class="bi bi-person-circle"></i> Username</p>
                                <p><i class="bi bi-person-circle"></i> Hak Akses</p>
                            </div>
                            <div className={classes['table-text']}>
                                <p>:</p>
                                <p>{loadedData.id_akun}</p>
                            </div> */}
                            {/* <div className={classes['table-text']}>
                            </div>
                        <tr>
                            <td><i class="bi bi-person-circle"></i></td>
                        </tr>
                        <tr>
                            <td><i class="bi bi-person-circle"></i></td>
                        </tr>
                    <tr>
                        <td>Id Akun</td>
                        <td>:</td>
                        <td>{loadedData.id_akun}</td>
                    </tr>
                    <tr>
                        <td>Username</td>
                        <td>:</td>
                        <td>{loadedData.username}</td>
                    </tr>
                    <tr>
                        <td>Hak Akses</td>
                        <td>:</td>
                        <td>{loadedData.hak_akses}</td>
                    </tr>
                     */}
                {/* </table> */}

                <div className={classes['batchbut1']}>
                    <button className={classes['delbut']} onClick={backHandler}>Back</button>
                    <button className={classes['savbut']} onClick={editHandler} >Edit</button>
                </div>
            </div>
        </Box> );
            }
        }

    </Await>
</Suspense>
    </>


  )
}



const loadStudent=async (id)=>{
  const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/siswa/" + id)
  console.log(response);
  if(!response.ok)
  {
    throw json(
      { message: 'Could not fetch siswa detail.' },
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

export async function loader({ request, params }) {
  const id = params.idSiswa;

  return defer({
  studentDetail: await loadStudent(id),
  });
}
