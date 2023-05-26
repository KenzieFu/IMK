import React from 'react'
import { BookKembali } from '../components/BookKembali'

export const PengembalianBuku = ({books}) => {
  console.log(books)
    // if(!books){
    //     return<>
    //     <p>Belum ada buku yang kamu kembalikan</p>
    //     </>
    const filter = books.peminjaman.filter(item=>item.pengembalian!=null)
    // }

  return (
    <>
       {filter.map((book)=>
        <BookKembali book={book}/>
       )}
    </>
  )

}
