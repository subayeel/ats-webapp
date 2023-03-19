import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/ui/ManagerNavbar'

function ManagerPage() {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default ManagerPage