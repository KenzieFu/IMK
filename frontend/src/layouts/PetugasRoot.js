import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export const PetugasRoot = () => {
  return (
    <>
        <header>
            <nav>
                <ul>
                    <NavLink to="/petugas">Home</NavLink>
                    <NavLink to="/petugas/scan">Scan Masuk</NavLink>
                    <NavLink to="/petugas/scan-keluar">Scan Keluar</NavLink>
                    <NavLink to="/petugas/absensi">Absensi</NavLink>
                </ul>
            </nav>
        </header>
        <main>
            <Outlet/>
        </main>
        
    </>

  )
}
