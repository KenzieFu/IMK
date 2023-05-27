import React, { useRef } from 'react'
import classes from "./Navbar.module.css"

import { Form, NavLink, json, useNavigate, useSubmit } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCart,useEffect } from 'react-use-cart';
import { authActions } from '../features/auth/authSlice';

export const Navbar = (props) => {

const authen=useSelector(state=>state.auth.isAuth);
const formRef=useRef();
// const {
//   emptyCart
// } = useCart();
const navigate=useNavigate();
   const dispatch= useDispatch();
const  logoutHandler=async(e)=>{

  const response = await fetch("http://localhost:8080/auth/logout", {
    method: "POST",
    headers:{
      "Authorization":"Bearer"
    },
  });


if(!response.ok)
{
    throw json(
        { message: 'Gagal Logout.' },
        {
          status: 500,
        }
      );
}
// emptyCart()
localStorage.removeItem('token');
localStorage.removeItem('expiration');
localStorage.removeItem('user');


  dispatch(authActions.logOut("test"));

  navigate("/");
  // emptyCart()

}
const { totalUniqueItems } = useCart()
  return (
    <>
        <header className={classes["nav-header"]}>
            <nav className={classes.navbar}>
                <ul>
                    <li className={classes.linav}><NavLink className={({isActive})=>isActive?classes.active:undefined}/*  style={{textDecoration:"none", color:"#2E55BA"}} */ to={authen?"/student":"/"}>Home</NavLink></li>
                    <li className={classes.linav}><NavLink className={({isActive})=>isActive?classes.active:undefined}/*  style={{textDecoration:"none", color:"#2E55BA"}} */ to="contactUs">Hubungi</NavLink></li>
                    <li className={classes.linav}><NavLink className={({isActive})=>isActive?classes.active:undefined}/*  style={{textDecoration:"none", color:"#2E55BA"}} */ to="/library">Perpustakaan</NavLink></li>
                </ul>
                <div className={classes.divide}>
                    <img src="/assets/logopng.png" className={classes['logo']} alt="" />
                </div>
                <ul>
                   {/*  <li className={classes['linav2']}><NavLink style={{textDecoration:"none", color:"#2E55BA"}} to="/admin">Masuk Admin</NavLink></li> */}
                  {!authen &&
                  <li className={classes['linav3']} onClick={props.onClick}>Login
                  </li>}

                  {authen && <li className={classes['linav3']} onClick={props.onClickCart}> Booking List </li>}

                  {authen &&
                    <li  className={classes['linav3']} onClick={logoutHandler}>Logout
                    </li>
                 }

                </ul>
            </nav>
        </header>
    </>
  )
}

