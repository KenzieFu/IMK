import React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '../../UI/Box'
import StudentForm from '../../components/admin/dashboard/StudentForm'
import { useRouteLoaderData } from 'react-router-dom'
import classes from './adminbatch.module.css';

export const EditStudentPage = () => {
  const {studentDetail}=useRouteLoaderData('detail-siswa')

  return (
    <>
        <Box>
            <h1 className={classes['judul']}>Edit Akun</h1>
            <StudentForm student={studentDetail} method="PUT"/>
        </Box>
    </>


  )
}
