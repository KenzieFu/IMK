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
            <img style={{ textAlign:"center",margin:"20px 0" }} src="./assets/book.png" width="270px" height="400px" alt="" />
            <div className={classes.rating}>
            <span className={'fa fa-star '+ classes.checked}></span>
                  <span className={'fa fa-star '+ classes.checked}></span>
                  <span className={'fa fa-star '+ classes.checked}></span>
                  <span className='fa fa-star'></span>
                  <span className='fa fa-star'></span>
            </div>
            <div className={classes["book-info"]}>
                <h1 className={classes["book-info_h1"]}>{latest[0].buku.judul_Buku}</h1>
                <span>{latest[0].buku.pengarang}</span>
            </div>
            <div className={classes.sinopsis}>
                <h2>Sinopsis</h2>
                <p>{latest[0].buku.sinopsis}</p>
            </div>



        </div>

        </>
        }
        </>
  )
}
