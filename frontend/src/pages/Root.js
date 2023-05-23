import React, { useEffect, useInsertionEffect } from 'react'
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom'
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
export const RootLayout = () => {
  const token=useLoaderData();
  const submit = useSubmit();
  const [showLogin,setShowLogin]=useState(false);
  const [showCart,setShowCart]=useState(false);
const authen=useSelector(state=>state.auth.isAuth);
const dispatch=useDispatch();
const user = useSelector(state=>state.auth.user)
if(!authen  || (authen ) )
{
  
}

useEffect(()=>{
  if(Object.keys(user)?.length === 0 && token ){
  
    dispatch(authActions.setCredentials({data:getUserCredentials()}));
  }

  if(token === "EXPIRED")
  {
    submit(null,{action:"/logout",method:"post"});
    dispatch(authActions.logOut())
    return ;
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
