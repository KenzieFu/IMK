import React from 'react'
import classes from './ListGenre.module.css'
import { Link } from 'react-router-dom'
export const ListGenre = ({genres}) => {
    
    let listGenre=genres.map((genre)=><Link style={{textDecoration:"none" }} to="/library"><li id={genre.id_kategori}><img src="./assets/genre.png" alt="" className={classes.booklogos}/>
  <span>{genre.nama_kategori}</span></li></Link>)

  return (
    <>
    <div className={classes.genre}>      
  <ul>
    <Link style={{textDecoration:"none" }} to="/library">
    <li><img src="./assets/all.png" alt="" className={classes.allbooklogo}/>
        <span>Semua</span></li>
    </Link>
    {listGenre}
    </ul>
    </div>
</>
  )
}
