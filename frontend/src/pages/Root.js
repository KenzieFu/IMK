import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../UI/Navbar'
import { Footer } from '../components/Footer'
import LoginModal from '../components/auth/Login'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { CartProvider } from 'react-use-cart'
import Cart from '../components/BookCart'
export const RootLayout = () => {
  const authen=useSelector(state=>state.auth.isAuth);
  const [showLogin,setShowLogin]=useState(false);
  const [showCart,setShowCart]=useState(false);


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
        <div style={{background:"white", minHeight:"100vh" }} className="App">
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
