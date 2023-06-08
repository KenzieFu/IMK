import React from 'react'
import { Book } from '../components/Book'

export const PeminjamanBuku = (props) => {
  const currentDate=new Date().getDate();
 
  const subtract=(obj)=>{
    return  currentDate - new Date(obj.tanggal_kembali).getDate();
  }
  const obj=props.books.sort((a,b)=>subtract(a)>subtract(b)?1:-1)
  return (
    <>
       {obj.map((book)=>
        <Book book={book}/>
       )}
    </>
  )
}
