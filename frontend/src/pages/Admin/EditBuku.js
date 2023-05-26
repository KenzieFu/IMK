import React from 'react'
import { Box } from '../../UI/Box'
import BookForm from '../../components/admin/dashboard/BookForm'
import { useRouteLoaderData } from 'react-router-dom'

export const EditBuku = () => {
  const {bookDetail}=useRouteLoaderData('admin-detail-buku')
  return (
    <Box>
      <BookForm book={bookDetail} method="PUT"/>
    </Box>
  )
}

