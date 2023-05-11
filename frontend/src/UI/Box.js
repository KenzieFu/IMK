import React from 'react'
import classes from './Box.module.css'
export const Box = (props) => {
  return (
    <>
      <div className={classes.box} >{props.children}</div>
    </>
  )
}
