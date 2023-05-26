import React from 'react'
import classes from './ListBooks.module.css'
import { Link } from 'react-router-dom'
export const ListBooks = ({books,genre}) => {
      console.log(books)
    
        const others =books.map((other)=>
        {
          if(other.buku !=null)
          {
            return(
            <Link to={`/library/${other.id_buku}`}> <li  id={other.id_buku}><img src={`http://localhost:8080${other.buku.gambar_buku}`} alt="" />
            <div className={classes["book-detail"]}>  <h2>{ other.buku.judul_buku.length > 15 ? other.buku.judul_buku.substring(0,14) +"..":other.buku.judul_buku}</h2>
            <span>{other.buku.pengarang}</span></div>
            </li></Link>);
          }
      }
    )

    const filtered =books.filter((other)=>other?.buku?.id_kategori === genre);
    let  filteredList=filtered.map((other)=>
    {
      if(other.buku !=null)
      {
        return(
        <Link to={`/library/${other.id_buku}`}> <li  id={other.id_buku}><img src={`http://localhost:8080${other.buku.gambar_buku}`} alt="" />
        <div className={classes["book-detail"]}><h2>{other.buku.judul_buku}</h2>
        <span>{other.buku.pengarang}</span></div>
        </li></Link>);
      }
  }
)

  
  return (
    <>
        <div className={classes.other}>
            <h1>Books To Read</h1>
            <ul>
                    {genre ===0 &&others}
                    {genre !==0 &&filteredList}
            </ul>
        </div>
    </>
  )
}
