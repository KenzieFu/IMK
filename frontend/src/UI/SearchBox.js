import React from 'react'
import classes from './SearchBox.module.css'
export const SearchBox = (props) => {
  return (
    <>
    <div className={classes['search-box']}>
        <input type="text" placeholder='Cari Buku...' value={props.keyword}  onChange={(event)=>props.keyHandler(event)} />
        <button className={classes["main-button"]}><i class="fa fa-search fa-lg fa-fw" aria-hidden="true"></i></button>
    </div>
    
    </>
  )
}
