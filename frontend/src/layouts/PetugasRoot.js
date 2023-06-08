import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { json } from 'react-router-dom'
import { authActions } from '../features/auth/authSlice'


export const PetugasRoot = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const  logoutHandler=async(e)=>{

        const response = await fetch("http://localhost:8080/auth/logout", {
          method: "POST",
          headers:{
            "Authorization":"Bearer"
          },
        });
      
      
      if(!response.ok)
      {
          throw json(
              { message: 'Gagal Logout.' },
              {
                status: 500,
              }
            );
      }
      localStorage.removeItem('token');
      localStorage.removeItem('expiration');
      localStorage.removeItem('user');
      
      
        dispatch(authActions.logOut("test"));
     
        navigate("/");
      
      }
  return (
    <>
        <header>
            <nav>
                <ul>
                    {/* <NavLink to="/petugas">Home</NavLink>
                    <NavLink to="/petugas/scan">Scan Masuk</NavLink>
                    <NavLink to="/petugas/scan-keluar">Scan Keluar</NavLink>
                    <NavLink to="/petugas/absensi">Absensi</NavLink>
                    <button onClick={logoutHandler}>Logout</button> */}
                    {/* <NavLink to="/petugas/siswa">Cek Peminjaman</NavLink>
                    <button onClick={logoutHandler}>Logout</button> */}
                </ul>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
        
    </>

  )
}
