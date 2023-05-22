import React from 'react'
import classes from './PopularBook.module.css'
import { Link } from 'react-router-dom';
export const SearchResult = (props) => {
  
    const filtered=(book)=>{
        return (book.judul_buku.includes(props.keyword) || 
                book.pengarang.includes(props.keyword) ||
                book.isbn.includes(props.keyword) ||
                book.penerbit.includes(props.keyword)||
                book.kategori.nama_kategori.includes(props.keyword)
        )
    }


    const pop =props.books.filter((popular)=>filtered(popular.buku) );
    const daily=pop.map((popular)=><Link to={`/library/${popular.id_buku}`}><li  id={popular.id}><img src="./assets/BookCover.png" alt="" />
    <div className={classes["book-detail"]}><h2>{popular.buku.judul_buku}</h2>
    <span>{popular.buku.pengarang}</span></div>
</li></Link>)

  return (
    <>
    <div className={classes.popular}>
    <div className={classes.wibulu}> 
      <h1>List</h1>
      <img src="./assets/anime-jump.gif" alt="" />
      </div>
        {daily?.length === 0? <h2>Tidak Ditemukan</h2>:<ul>{daily}</ul>}
    </div>
    
    </>
  )
}
