import React from 'react'
import { BookKembali } from '../components/BookKembali'

export const PengembalianBuku = ({books}) => {

    // if(!books){
    //     return<>
    //     <p>Belum ada buku yang kamu kembalikan</p>
    //     </>
    // }

  return (
    <>
       {books.map((book)=>
        <BookKembali book={book}/>
       )}
    </>
  )

}
