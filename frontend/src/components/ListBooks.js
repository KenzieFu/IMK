import React from 'react'
import classes from './ListBooks.module.css'
import { Link } from 'react-router-dom'
export const ListBooks = ({books}) => {
    
    
        const others =books.map((other)=><Link to={`/library/${other.id_buku}`}> <li  id={other.id}><img src={other.img} alt="" />
        <div className={classes["book-detail"]}><h2>{other.buku.judul_buku}</h2>
        <span>{other.buku.pengarang}</span></div>
    </li></Link>)

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
