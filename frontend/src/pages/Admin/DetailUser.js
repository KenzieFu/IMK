import React from 'react'
import { Box } from '../../UI/Box'
import { Await, useRouteLoaderData, useNavigate } from 'react-router-dom'
import { json,defer } from 'react-router-dom'
import { Suspense } from 'react'
import classes from './adminbatch.module.css';
import { FormGroup } from 'reactstrap'

export const DetailUser = () => {
    const { userDetail }= useRouteLoaderData("detail-akun");
    const navigate= useNavigate();
    const backHandler=()=>{
        navigate("..");
    }
    const editHandler=()=>{
        navigate(`/admin/user/${userDetail.id_akun}/edit`)
    }
  return (
    <>
   {/*  <Box>
        <div className='user-info'>
            <h1>Informasi Pemilik Akun</h1>
            <div style={{ display:"flex" }}>
                <div style={{ width:"500px" }}  className='photo'>Photo</div>
                <div className='user-details'>
                  
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>Kenzie</td>
                            </tr>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>Kenzie</td>
                            </tr>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>Kenzie</td>
                            </tr>
                </div>
            </div>
        </div>
    </Box> */}
    <Suspense>
        <Await resolve={userDetail}>
            {(loadedData)=>
                {
                    return(
                <Box>
        
                <div  className={classes['form']}>
                    <h1 className={classes['judul1']}>Akun </h1>
                    <div className={classes['table-grup']}>
                        <FormGroup style={{display: "block"}}>
                            <label className={classes['label']}>ID Akun</label>
                            <input style={{width: "97%", margin: "auto"}}  className={classes['input']} disabled value={loadedData.id_akun} />
                        </FormGroup>
                        <FormGroup style={{display: "block"}}>
                            <label className={classes['label']}>Username</label>
                            <input style={{width: "97%", margin: "auto"}} className={classes['input']} disabled value={loadedData.username} />
                        </FormGroup>
                        <FormGroup style={{display: "block"}}>
                            <label className={classes['label']}>Hak Akses</label>
                            <input style={{width: "97%", margin: "auto"}} className={classes['input']} disabled value={loadedData.hak_akses} />
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



const loadUser=async (id)=>{
    const response = await fetch("http://localhost:8080/admin-perpustakaan-methodist-cw/akun/"+id)
    console.log(response);
    if(!response.ok)
    {
      throw json(
        { message: 'Could not fetch user detail.' },
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
    const id = params.idAkun;
  
    return defer({
      userDetail: await loadUser(id),
    });
  }