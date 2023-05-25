import React from 'react'
import classes from './PopularBook.module.css'
import { Link } from 'react-router-dom';
export const PopularBook = (props) => {
  
    const pop =props.books.filter((popular,index)=> (index%3 !==0 || index===0) );
    const daily=pop.map((popular)=><Link to={`/library/${popular.id_buku}`}><li  id={popular.id}><img src={`http://localhost:8080${popular.buku.gambar_buku}`} alt="" />
    <div className={classes["book-detail"]}><h2>{popular.buku.judul_buku}</h2>
    <span>{popular.buku.pengarang}</span></div>
</li></Link>)

  return (
    <>
    <div className={classes.popular}>
    <div className={classes.wibulu}> 
      <h1>Pilihan Harian</h1>
      <img src="./assets/anime-jump.gif" alt="" />
      </div>
    <ul>
        {daily}
    </ul>
    </div>
    
    </>
  )
}
