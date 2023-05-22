import React from 'react'
import classes from './ListBooks.module.css'
import { Link } from 'react-router-dom'
export const ListBooks = ({books}) => {
      console.log(books)
    
        const others =books.map((other)=>
        {
          if(other.buku !=null)
          {
            return(
            <Link to={`/library/${other.id_buku}`}> <li  id={other.id_buku}><img src={other.buku.img} alt="" />
            <div className={classes["book-detail"]}><h2>{other.buku.judul_buku}</h2>
            <span>{other.buku.pengarang}</span></div>
            </li></Link>);
          }
      }
    )

    console.log(books);
  return (
    <>
        <div className={classes.other}>
            <h1>Books To Read</h1>
            <ul>
                    {others}
            </ul>
        </div>
    </>
  )
}
