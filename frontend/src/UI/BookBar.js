import React from 'react'
import classes from './BookBar.module.css'
export const BookBar = (props) => {
  let currentFill = "0%";
  if(props.max>0)
  {
    currentFill =Math.round((props.current/props.max) *100) +"%"
  }
   

  return (
    <div className={classes.chart}>
        <img className={classes.img} src={props.image} width="50px" height="50px" alt="" />
        <div className={classes.chartInfo}>

            <div className={classes.label}>
                <p style={{ color:props.color }}>{props.label}</p>
                <p style={{ color:"#BEBEBE", display:"flex", fontSize:"1vw" }}>
                  <span style={{ color:props.color, fontSize:"1vw" }}>{props.current}</span>/{props.max}
                </p>
            </div>
    
            <div className={classes.bar}>
                <div className={classes['bar__inner']}>
                    <div className={classes['bar__fill']} style={{ background:props.color, width:currentFill }}></div>
                </div>
            </div>
        </div>
    </div>
  )
}
