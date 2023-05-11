import React from 'react'
import { Box } from '../../UI/Box'
import { Await, useRouteLoaderData, useNavigate } from 'react-router-dom'
import { json,defer } from 'react-router-dom'
import { Suspense } from 'react'

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
        
                <div className='acc-info'>
                    <h1>Akun </h1>
                    <table>
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
                        
                    </table>
        
                    <div>
                        <button onClick={backHandler}>Back</button>
                        <button onClick={editHandler} >Edit</button>
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