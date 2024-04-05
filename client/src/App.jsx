// import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { IndexPage } from './pages/IndexPage'
import { LoginPage } from './pages/LoginPage'
import { Layout } from './components/Layout'
import { RegisterPage } from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
