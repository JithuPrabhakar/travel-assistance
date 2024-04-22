import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { IndexPage } from './screens/IndexPage'
import { LoginPage } from './screens/LoginPage'
import { RegisterPage } from './screens/RegisterPage'
import AccountPage from './screens/AccountPage'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<Layout />}>
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/:subpage/:action' element={<AccountPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
