import React from 'react'
import { Box } from '../UI/Box'
import classes from "./BookKembali.module.css"
import { Link } from 'react-router-dom'

export const BookKembali = ({book}) => {



  return (
    <Box>
        <div style={{ marginLeft:"50px", display:"flex",padding:'35px' }}>
            <img sty width="150px" height="210" src="./assets/book.png" alt="" />
            <div className={classes["book-info"]} id='book-info'>
                <span className={classes["due-date"]}>{book.pengembalian.status}</span>
                <div style={{ display:"flex",justifyContent:"space-between", alignItems:"center",marginBottom:"0",paddingBottom:"0" }}>
                  <div>
                  <h1 className={classes["book-info_h1"]}>{book.buku.judul_Buku}</h1>
                  <p style={{ marginTop:"0",paddingTop:"0"  }}>{book.buku.pengarang}</p>
                  </div>
                    <Link type='button' to={`/library/${book.buku.id_buku}`} className={classes["book-info_button"]}>Details</Link>
                </div>

                <div className={classes.rating}>
                  <div className={classes.stars}>
                  <span className={'fa fa-star '+ classes.checked}></span>
                  <span className={'fa fa-star '+ classes.checked}></span>
                  <span className={'fa fa-star '+ classes.checked}></span>
                  <span className='fa fa-star'></span>
                  <span className='fa fa-star'></span>
                  </div>
                  <span>3.0</span>
                </div>
            </div>
        </div>
    </Box>
  )
}