import React from 'react'
import classes from './ListGenre.module.css'
import { Link } from 'react-router-dom'
export const ListGenre = ({genres,setGenre,current}) => {

    
    let listGenre=genres.map((genre)=>
    <span onClick={()=>setGenre(genre.id_kategori)} className={classes["genretab-button"]}  style={{textDecoration:"none" }} >
    <li style={{ background:current===genre.id_kategori?"#fedaa7":"none" }} id={genre.id_kategori}>
  <span>{genre.nama_kategori}</span></li></span>)

  return (
    <>
    <div className={classes.genre}> 
    <div className={classes.genretab}> 
  <ul>
    <span onClick={()=>setGenre(0)} className={classes["genretab-button"]} style={{textDecoration:"none"}}>
    <li style={{ background:current===0?"#fedaa7":"none" }}>
        <span><i class="fa fa-globe" aria-hidden="true"></i> Semua</span>
    </li></span>
   
    {listGenre}
    </ul>
    </div>
    </div>
</>
  )
}
