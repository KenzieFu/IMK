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
          <div className={classes["sidetop"]}>
          <ul>
            <NavLink className={({isActive})=>isActive?classes.homeActive:classes.home} to="/student"></NavLink>
            <NavLink className={({isActive})=>isActive?classes.calenderActive:classes.calender} to="/calender"></NavLink>
            <NavLink className={({isActive})=>isActive?classes.assignmentActive:classes.assignment} to="/assignment"></NavLink>
            <NavLink className={({isActive})=>isActive?classes.historyActive:classes.history} to="/history"></NavLink>
          </ul>
            <div className={classes["sidedown"]}>
          <ul>
            <img src='../assets/image1.png'></img>
          </ul>
          </div>
          </div>
        </nav>
    </div>
    
    </StickyBox>
   
    </>
  )
}
