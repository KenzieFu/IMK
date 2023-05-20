import React, { useEffect } from 'react'
import classes from "./Input.module.css"
export const Input = ({label,type,id,name,addAttribute,defaultValue}) => {
  
  return (
    <>
  
    <div className={classes.box}>
        <label htmlFor={id}>{label}</label>
          <input type={type} id={id} name={name} {...addAttribute} defaultValue={defaultValue} />
    </div>
    </>
  )
}
