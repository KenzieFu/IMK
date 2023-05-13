import React from 'react'
import classes from "./Input.module.css"
export const Input = ({label,type,id,name}) => {
  return (
    <>
    <div className={classes.box}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} name={name}  />
    </div>
    </>
  )
}
