import React from 'react'

import classes from './LatestBook.module.css'
export const LatestBook = ({latest}) => {
 console.log(latest)
  return (
    <>
        {latest.length !=0 &&
            <>

        <div className={classes.box} style={{ maxWidth:"400px" }}>

                <h1>Baru Dipinjam</h1>
            <img style={{ textAlign:"center",margin:"20px 0" }} src={`http://localhost:8080${latest[0].buku.gambar_buku}`} width="270px" height="400px" alt="" />
           {/*  <div className={classes.rating}>
            <span className={'fa fa-star '+ classes.checked}></span>
                  <span className={'fa fa-star '+ classes.checked}></span>
                  <span className={'fa fa-star '+ classes.checked}></span>
                  <span className='fa fa-star'></span>
                  <span className='fa fa-star'></span>
            </div> */}
            <div className={classes["book-info"]}>
                <h1 className={classes["book-info_h1"]}>{latest[0].buku.Judul_Buku}</h1>
                <span>{latest[0].buku.pengarang}</span>
            </div>
            <div className={classes.sinopsis}>
                <span>Sinopsis</span>
                <p>{latest[0].buku.sinopsis}</p>
            </div>



        </div>

        </>
        }
        </>
  )
}