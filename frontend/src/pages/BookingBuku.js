import React from 'react'
import { BookPesan } from '../components/BookPesan'

export const BookingBuku = ({books}) => {

  return (
    <>
       {books.map((book)=>
        <BookPesan book={book}/>
       )}
    </>
  )
}
