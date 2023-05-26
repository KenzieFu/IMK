import React from 'react'
import { BookPesan } from '../components/BookPesan'

export const BookingBuku = ({books,rerender}) => {

  return (
    <>
       {books.map((book)=>
        <BookPesan rerender={rerender} book={book}/>
       )}
    </>
  )
}
