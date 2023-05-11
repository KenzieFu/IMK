import React from 'react'
import { Book } from '../components/Book'

export const PeminjamanBuku = ({books}) => {
  
  return (
    <>
       {books.map((book)=>
        <Book book={book}/>
       )}
    </>
  )
}
