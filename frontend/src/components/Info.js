import React from 'react'
import classes from "./Info.module.css"

export const Info = (props) => {
  return (
    <div className={classes.box} >
        <img src={props.img} className={classes.img}/>
      
        <div className={classes.info}>
            <h2 style={{ marginBottom:"0px" }}>{props.title}</h2>
            <p>{props.content}</p>
            <button className={classes["info-button"]}>{props.button}</button>
        </div>
    </div>
  )
}
