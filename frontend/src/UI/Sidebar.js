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
<<<<<<< HEAD
          <ul >
            <Link to="/"><img src='../assets/home.svg'></img></Link>
            <Link to="/calender"><img src='../assets/icon1.svg'></img></Link>
            <Link to="/assignment"><img src='../assets/icon2.svg'></img></Link>
            <Link to="/history"><img src='../assets/icon3.svg'></img></Link>
=======
          <div className={classes["sidetop"]}>
          <ul>
            <NavLink className={({isActive})=>isActive?classes.homeActive:classes.home} to="/student"></NavLink>
            <NavLink className={({isActive})=>isActive?classes.calenderActive:classes.calender} to="/calender"></NavLink>
            <NavLink className={({isActive})=>isActive?classes.assignmentActive:classes.assignment} to="/assignment"></NavLink>
            <NavLink className={({isActive})=>isActive?classes.historyActive:classes.history} to="/history"></NavLink>
>>>>>>> 79277db0348b015439be31c9ff2380ac2b851b43
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
