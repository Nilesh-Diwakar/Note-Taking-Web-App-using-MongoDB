import React from 'react'
import Header from "../components/Header"
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow overflow-y-auto pb-16 lg:pb-0">
      <Header />
        <Outlet />
      </main>
      <NavBar />
    </div>
  )
}

export default RootLayout
