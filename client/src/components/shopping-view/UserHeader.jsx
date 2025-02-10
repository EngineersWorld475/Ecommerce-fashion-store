import { CircleUserRound, Crown, MenuIcon, ShoppingBag } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '../config'
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from '../ui/dropdown-menu'
import { logoutUser } from '@/store/auth-slice'
import CartWrapper from './CartWrapper'
import { fetchCartItems } from '@/store/shop/cart-slice'

const UserHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { cartItems } = useSelector((state) => state.ShoppingCart)
  const [openCartSheet, setOpenCartSheet] = useState(false)

  useEffect(() => {
    dispatch(fetchCartItems(user?.id))
  }, [dispatch, user?.id])

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/auth/login')
    })
  }

  const MenuItems = () => (
    <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link key={menuItem.id} to={menuItem.path} className='text-sm font-md text-gray-600'>
          {menuItem.label}
        </Link>
      ))}
    </nav>
  )

  const UserDropdown = () => (
    <DropdownMenu>
              <DropdownMenuTrigger>
                <div className='flex items-center justify-center text-center w-8 h-8 font-semibold text-lg rounded-full pb-1 bg-[#60C54B] text-white'>
                  {user?.username[0]}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-white'>
                <DropdownMenuItem><p className="text-gray-500">Logged in as {user?.username}</p></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link className="text-gray-500">Accounts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={handleLogout} variant="outline" className="border border-red-500  py-3 text-red-500 hover:bg-red-600 hover:text-white">Logout</Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
  )

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex items-center justify-between px-10 py-20 lg:py-40 lg:px-100'>
        <Link to='/shop/home' className='flex items-center gap-2' style={{ color: '#60C54B', fontFamily: '"Lucida Handwriting", cursive' }}>
          <Crown style={{ height: '35px', width: '35px' }} />
          <span className='font-bold text-xl'>Veltrix</span>
        </Link>
        <div className='hidden lg:block'>
          <div>
            <MenuItems />
          </div>
        </div>
        {!isAuthenticated ? (
          <div className='flex flex-row justify-center items-center gap-7'>
            <Button onClick={() => navigate('/auth/login')} variant="outline" className="py-4 rounded-xl hover:bg-red-500 hover:text-white text-[#60C54B] cursor-pointer">Sign-in</Button>
            <CircleUserRound className="text-[#60C54B] w-[30px] h-[30px] cursor-pointer" />
          </div>
        ) : (
          <div className='flex flex-row justify-center items-center gap-4 lg:gap-7'>
            <Button onClick={() => setOpenCartSheet(true)} className="bg-transparent hover:bg-transparent">
              <ShoppingBag style={{ color: '#60C54B', width: '30px', height: '30px', cursor: 'pointer' }} />
            </Button>
            {/* user dropdown */}
            <UserDropdown />
            <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden text-white h-[30] w-[30] bg-[#60C54B]">
              <MenuIcon style={{width:'25px',height: '25px'}}/>
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-xs bg-white">
            <MenuItems />
          </SheetContent>
        </Sheet>
          </div>
        )}
        <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
          <CartWrapper cartItems={cartItems.items} />
        </Sheet>
      </div>
    </header>
  )
}

export default UserHeader;
