import React from 'react'
import classes from './BookBar.module.css'
export const BookBar = (props) => {
  return (
    <div className={classes.chart}>
        <img className={classes.img} src={props.image} width="50px" height="50px" alt="" />
        <div className={classes.chartInfo}>
            <div className={classes.label}>
                <p style={{ color:props.color }}>{props.label}</p>
                <p style={{ color:"#BEBEBE" }}> <span style={{ color:props.color }}>3</span>/5</p>
            </div>
    
            <div className={classes.bar}>
                
            </div>
        </div>
    </div>
  )
}
