import React from 'react'
import classes from "./Sidebar.module.css"
import { Link } from 'react-router-dom'
export const Sidebar = () => {
  return (
    <>
    <div className={classes.sidebar}>
        <nav className={classes["side-nav"]}>
          <ul>
            <Link to="/"><img src='../assets/home.svg'></img></Link>
            <Link to="/calender"><img src='../assets/icon1.svg'></img></Link>
            <Link to="/assignment"><img src='../assets/icon2.svg'></img></Link>
            <Link to="/history"><img src='../assets/icon3.svg'></img></Link>
          </ul>
        </nav>
    </div>
    
    </>
  )
}
