import React from 'react'
import classes from "./Sidebar.module.css"
import {  NavLink } from 'react-router-dom'
import StickyBox from "react-sticky-box";

export const Sidebar = () => {
  return (
    <>
    <StickyBox offsetTop={90} >

    <div className={classes.sidebar}>
        <nav className={classes["side-nav"]}>
          <ul >
            <NavLink to="/"><img src='../assets/home.svg'></img></NavLink>
            <NavLink to="/calender"><img src='../assets/icon1.svg'></img></NavLink>
            {/* <NavLink to="/assignment"><img src='../assets/icon2.svg'></img></NavLink>
            <NavLink to="/history"><img src='../assets/icon3.svg'></img></NavLink> */}
          </ul>
            <div className={classes["sidedown"]}>
          <ul>
            <img src='../assets/image1.png'></img>
          </ul>
          </div>
        </nav>
    </div>
    
    </StickyBox>
   
    </>
  )
}
