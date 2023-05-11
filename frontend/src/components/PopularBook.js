import React from 'react'
import classes from './PopularBook.module.css'
import { Link } from 'react-router-dom';
export const PopularBook = (props) => {

    /* const DUMMY_POPULAR=[
    {id:"p1",title:"My Quite Imagination",img:"./assets/BookCover.png",author:"Yoga Martabak"},
    {id:"p2",title:"My Quite Imagination",img:"./assets/BookCover.png",author:"Yoga Martabak"},
    {id:"p3",title:"My Quite Imagination",img:"./assets/BookCover.png",author:"Yoga Martabak"},
    {id:"p4",title:"My Quite Imagination",img:"./assets/BookCover.png",author:"Yoga Martabak"},
    {id:"p5",title:"My Quite Imagination",img:"./assets/BookCover.png",author:"Yoga Martabak"},
    {id:"p6",title:"My Quite Imagination",img:"./assets/BookCover.png",author:"Yoga Martabak"},
    ] */

    const pop =props.books.filter((popular,index)=> (index%3 !==0 || index===0) );
    const daily=pop.map((popular)=><Link to={`/library/${popular.id_buku}`}><li  id={popular.id}><img src="./assets/BookCover.png" alt="" />
    <div className={classes["book-detail"]}><h2>{popular.buku.judul_buku}</h2>
    <span>{popular.buku.pengarang}</span></div>
</li></Link>)

  return (
    <>
    <div className={classes.popular}>
    <div className={classes.wibulu}> 
      {/* <img src="./assets/anime-pat.gif" alt="" /> */}
      <h1>Daily Picks</h1>
      </div>
    <ul>
        {daily}
        
    </ul>
    </div>
    
    </>
  )
}
