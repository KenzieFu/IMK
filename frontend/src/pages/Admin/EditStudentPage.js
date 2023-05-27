import React from 'react'
import { Link } from 'react-router-dom'
import { Box } from '../../UI/Box'
import UserForm from '../../components/admin/dashboard/UserForm'
import { useRouteLoaderData } from 'react-router-dom'

export const EditStudentPage = () => {
  const {studentDetail}=useRouteLoaderData('detail-siswa')

  return (
    <>
        <div>EditStudentPage</div>
        <Link to="..">Back</Link>
    </>


  )
}
