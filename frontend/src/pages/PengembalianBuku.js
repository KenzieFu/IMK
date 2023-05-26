import React from 'react'
import { BookKembali } from '../components/BookKembali'

export const PengembalianBuku = ({books}) => {

    // if(!books){
    //     return<>
    //     <p>Belum ada buku yang kamu kembalikan</p>
    //     </>
    const filter = books.filter(item=>item.pengembalian!=null)
    // }

  return (
    <>
       {filter.map((book)=>
        <BookKembali book={book}/>
       )}
    </>
  )

}
