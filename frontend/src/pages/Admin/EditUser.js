import React from 'react'
import { Box } from '../../UI/Box'
import UserForm from '../../components/admin/dashboard/UserForm'
import { useRouteLoaderData } from 'react-router-dom'
import classes from './adminbatch.module.css';

export const EditUser = () => {
    const {userDetail}=useRouteLoaderData('detail-akun')
  return (
    <>
        <Box>
            <h1 className={classes['judul']}>Edit Akun</h1>
            <UserForm user={userDetail} method="PUT"/>
        </Box>
    </>
  )
}
