import React from 'react'
import classes from "./Sidebar.module.css"
import { Link } from 'react-router-dom'
export const Sidebar = () => {
  return (
    <>
    <div className={classes.sidebar}>
        <nav className={classes["side-nav"]}>
<<<<<<< HEAD
          <ul >
=======
          <div className={classes["sidetop"]}>
          <ul>
>>>>>>> c8357c6bfeb1482e7f6dee081279983e24152188
            <Link to="/"><img src='../assets/home.svg'></img></Link>
            <Link to="/calender"><img src='../assets/icon1.svg'></img></Link>
            <Link to="/assignment"><img src='../assets/icon2.svg'></img></Link>
            <Link to="/history"><img src='../assets/icon3.svg'></img></Link>
          </ul>
          </div>

            <div className={classes["sidedown"]}>
          <ul>
            <img src='../assets/image1.png'></img>
          </ul>
          </div>
        </nav>
    </div>
    
    </>
  )
}
