import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import AuthLogin from './pages/auth/AuthLogin'
import AuthRegister from './pages/auth/AuthRegister'
import AdminLayout from './components/admin-view/AdminLayout'
import Dashboard from './pages/admin-view/Dashboard'
import Features from './pages/admin-view/Features'
import Orders from './pages/admin-view/Orders'
import Products from './pages/admin-view/Products'
import UserLayout from './components/shopping-view/UserLayout'
import NotFound from './pages/NotFound'
import Accounts from './pages/shopping-view/Accounts'
import Checkout from './pages/shopping-view/Checkout'
import Listing from './pages/shopping-view/Listing'
import Home from './pages/shopping-view/Home'
import CheckAuth from './components/common/CheckAuth'
import UnauthPage from './pages/unauth-page'
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"
import Categories from './pages/admin-view/Categories'
import { Toaster } from "@/components/ui/toaster"


const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  console.log('...isAuthenticated', isAuthenticated)
  console.log('...user', user)
  console.log('...isLoading', isLoading)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if(isLoading) {
    return <div>
      <Skeleton className="w-full h-[600px]" />
    </div>
  }


  return (
    <div className='flex flex-col overflow-hidden bg-white'>
      <ToastContainer />
      <Routes>
      <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={<AuthLogin />} />
          <Route path='register' element={<AuthRegister />} />
        </Route>
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth> 
        }>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='features' element={<Features />} />
          <Route path='orders' element={<Orders />} />
          <Route path='products' element={<Products />} />
          <Route path='category' element={<Categories />}/>
        </Route>
        <Route path='/shop' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <UserLayout />
          </CheckAuth>
        }>
          <Route path='home' element={<Home />} />
          <Route path='accounts' element={<Accounts />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='listing' element={<Listing />} />
        </Route>
        <Route path='/' element={<Navigate to='/shop/home' replace />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
