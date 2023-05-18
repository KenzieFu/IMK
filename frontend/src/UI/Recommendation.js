import React from 'react'
import classes from './Recommendation.module.css'
export const Recommendation = (props) => {
  return (
      <div className={classes.uparent}>
      <div className={classes['topup']}>
      </div>
      <div className={classes['uphead']}>
        <a href='#' className={classes['upimg']}>
      <img src="./assets/BookCover.png" alt="" />
        </a>
      </div>
      <div className={classes['uptext']}>
        <div className={classes['upintext']}>
      <span>Rekomendasi hari ini :</span>
      <h1> Kimia XII</h1>
      <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </span>
      <button className={classes['buttonup']}>Detail Buku</button>
        </div>
      </div>
      <div className={classes['introtop']}>
        <span> 
        </span>
      </div>
      </div>
  )
}