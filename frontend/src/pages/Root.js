import React, { useEffect, useInsertionEffect, useRef } from 'react'
import { Navigate, Outlet, useLoaderData, useNavigate, useSubmit } from 'react-router-dom'
import { Navbar } from '../UI/Navbar'
import { Footer } from '../components/Footer'
import LoginModal from '../components/auth/Login'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { CartProvider } from 'react-use-cart'
import Cart from '../components/BookCart'
import { getTokenDuration } from '../components/util/auth'
import { authActions } from '../features/auth/authSlice'
import { getUserCredentials } from '../components/util/auth'
import { json } from 'react-router-dom'
export const RootLayout = () => {
  const token=useLoaderData();
  const submit = useSubmit();
  const [showLogin,setShowLogin]=useState(false);
  const [showCart,setShowCart]=useState(false);
const authen=useSelector(state=>state.auth.isAuth);
const dispatch=useDispatch();
const navigate=useNavigate();
const user = useSelector(state=>state.auth.user)

console.log(token);

const  logoutHandler= useRef(async()=>{

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
localStorage.removeItem('token');
localStorage.removeItem('expiration');
localStorage.removeItem('user');


  dispatch(authActions.logOut("test"));
  console.log("Inside Logout Fucnvtion")
  navigate("/");

});


useEffect(()=>{
  if(Object.keys(user)?.length === 0 && token ){
  
    dispatch(authActions.setCredentials({data:getUserCredentials()}));
    return
  }
  console.log(token)

  if(token === "EXPIRED")
  {
    console.log("Before Logout")
   logoutHandler.current();
   console.log("After Logout")
  }

  const tokenDuration=getTokenDuration();
  setTimeout(()=>{

  },tokenDuration);
  
},[token,submit])


  const showLoginModal=()=>{
      setShowLogin(true);
  }

  const closeLoginModal=()=>{
      setShowLogin(false);
  }
  const showCartModal=()=>{
    setShowCart(true);
}

const closeCartModal=()=>{
    setShowCart(false);
}
  return (
    <>
   <CartProvider>
        <div style={{background:"#f4f1f1", minHeight:"100vh" }} className="App">
          {showLogin &&<LoginModal onClose={closeLoginModal}/>}
          {showCart && <Cart onClose={closeCartModal}/>}
    <Navbar style={{position:"relative"}} onClick={showLoginModal} onClickCart={showCartModal} />
    <main>
      <Outlet/>
    </main>

      <Footer/>
      </div>
      </CartProvider>
    </>
  )
  
}
