import React from 'react'
import classes from './PopularBook.module.css'

import { Link } from 'react-router-dom';
export const SearchResult = (props) => {
  
    const filtered=(book)=>{
      const low=props.keyword.toLowerCase()
        return (book.judul_buku.toLowerCase().includes(low) || 
                book.pengarang.toLowerCase().includes(low) ||
                book.isbn.toLowerCase().includes(low) ||
                book.penerbit.toLowerCase().includes(low)||
                book.kategori.nama_kategori.toLowerCase().includes(low)
        )
    }


    const pop =props.books.filter((popular)=>filtered(popular.buku) );
    const daily=pop.map((popular)=><Link to={`/library/${popular.id_buku}`}><li  id={popular.id}><img src={`http://localhost:8080${popular.buku.gambar_buku}`} alt="" />
    <div className={classes["book-detail"]}><h2>{popular.buku.judul_buku}</h2>
    <span>{popular.buku.pengarang}</span></div>
</li></Link>)

  return (
    <>
    <div className={classes.popular}>

      <div className={classes.notfound}>
        {daily?.length === 0? <h1>Buku tidak ditemukan <i class="fa fa-frown-o" aria-hidden="true"></i></h1>:<ul>{daily}</ul>}
      </div>
    </div>
    
    </>
  )
}
