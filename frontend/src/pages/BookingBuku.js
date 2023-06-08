import React from 'react'
import { BookPesan } from '../components/BookPesan'

export const BookingBuku = (props) => {

  return (
    <>
       {props.books.map((book)=>
        <BookPesan rerender={props.rerender} book={book}/>
       )}
    </>
  )
}
