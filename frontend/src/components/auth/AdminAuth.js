import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate, useOutlet } from 'react-router-dom'

export const AdminAuth = ({children}) => {
    const middleware=useSelector(state=>state.auth);
    const navigate=useNavigate();
    const outlet=useOutlet();

        if(!middleware.isAuth)return<Navigate to="/"/>;
        else if(middleware.isAuth && middleware.user.hak_akses !="Admin" )
        {
            if(middleware.user.hak_akses ==="Siswa")
            {
                return <Navigate to="/"/>
            }
        }

        return(
            <>
            {children}
            </>
        )

}