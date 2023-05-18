import React from 'react'
import classes from './ListGenre.module.css'
import { Link } from 'react-router-dom'
export const ListGenre = ({genres}) => {
    let listGenre=genres.map((genre)=>
    <Link className={classes.genretab}  style={{textDecoration:"none" }} to="/library">
    <li id={genre.id_kategori}>
  <span>{genre.nama_kategori}</span></li></Link>)

  return (
    <>
    <div className={classes.genre}> 
    <div className={classes.genretab}> 
  <ul>
    <Link className={classes.genretab} style={{textDecoration:"none"}} to="/library">
    <li style={{backgroundColor:"#fedaa7"}}>
        <span><i class="fa fa-globe" aria-hidden="true"></i> Semua</span>
    </li>
    </Link>
    {listGenre}
    </ul>
    </div>
    </div>
</>
  )
}
