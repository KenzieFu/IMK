import React from 'react'
import classes from "./Navbar.module.css"

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCart,useEffect } from 'react-use-cart';
import { authActions } from '../features/auth/authSlice';
export const Navbar = (props) => {
const authen=useSelector(state=>state.auth.isAuth);
const navigate=useNavigate();
   const dispatch= useDispatch();
const  logoutHandler=()=>{
  dispatch(authActions.logOut());
  navigate("/");
}
const { totalUniqueItems } = useCart()
  return (
    <>
        <header className={classes["nav-header"]}>
            <nav className={classes.navbar}>
                <ul>
                    <li className={classes['linav']}><NavLink style={{textDecoration:"none", color:"#2E55BA"}} to="/">Home</NavLink></li>
                    <li className={classes['linav']}><NavLink style={{textDecoration:"none", color:"#2E55BA"}} to="contactUs">Hubungi</NavLink></li>
                    <li className={classes['linav']}><NavLink style={{textDecoration:"none", color:"#2E55BA"}} to="/library">Perpustakaan</NavLink></li>
                </ul>
                <div className={classes.divide}>
                    <img src="/assets/logopng.png" className={classes['logo']} alt="" />
                </div>
                <ul>
                   {/*  <li className={classes['linav2']}><NavLink style={{textDecoration:"none", color:"#2E55BA"}} to="/admin">Masuk Admin</NavLink></li> */}
                  {!authen &&  <li className={classes['linav3']} onClick={props.onClick}>Login</li>}
                  {authen &&  <li className={classes['linav3']} onClick={logoutHandler}>LogOut</li>}
                  {authen && <li className={classes['linav3']} onClick={props.onClickCart}>Booking List </li>}
                </ul>
            </nav>
        </header>
    </>
  )
}

