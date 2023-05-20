import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate, useOutlet } from 'react-router-dom'

export const StudentAuth = ({children}) => {
    const middleware=useSelector(state=>state.auth);
    const navigate=useNavigate();
    const outlet=useOutlet();

        if(!middleware.isAuth)return<Navigate to="/"/>;
        else if(middleware.isAuth && middleware.user.hak_akses !="Siswa" )
        {
            if(middleware.user.hak_akses ==="Admin")
            {
                return <Navigate to="/admin"/>
            }
        }

        return(
            <>
            {children}
            </>
        )

}