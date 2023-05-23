import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate, useOutlet } from 'react-router-dom'
import { getAuthToken } from '../util/auth';

export const StudentAuth = ({children}) => {
    const middleware=useSelector(state=>state.auth);
    const auth=useSelector(state=>state.auth.isAuth)
    const navigate=useNavigate();
    const token = getAuthToken()
    const outlet=useOutlet();
     

        if(!auth && token === null)return<Navigate to="/"/>;
        else if(auth && middleware.user?.hak_akses !="Siswa" )
        {
            if(middleware.user?.hak_akses ==="Admin")
            {
                return <Navigate to="/admin"/>
            }
            else if(middleware.user.hak_akses ==="Petugas")
            {
                return <Navigate to="/petugas"/>
            }
        }

        return(
            <>
            {children}
            </>
        )

}
