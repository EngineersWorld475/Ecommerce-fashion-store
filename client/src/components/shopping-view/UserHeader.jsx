import { CircleUserRound, Crown, Menu, ShoppingBag } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '../config'
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel } from '../ui/dropdown-menu'
import { logoutUser } from '@/store/auth-slice'

const UserHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/auth/login')
    })
  }
  const [textColor, setTextColor] = useState('#60C54B')
  const [bgColor, setBgColor] = useState('')

  const MenuItems = () => {
    return (
      <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
        {
          shoppingViewHeaderMenuItems.map((menuItem) => {
            return (
              <Link key={menuItem.id} to={menuItem.path} className='text-sm font-md text-gray-600'>
                {menuItem.label}
              </Link>
            )
          })
        }
      </nav>
    )
  }

  const HeaderRightContent = () => {
    return <>
      <div className='hidden lg:flex flex-row justify-center items-center gap-7'>
        <ShoppingBag style={{ color: '#60C54B', width: '30px', height: '30px', cursor: 'pointer' }} />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              className='flex items-center justify-center text-center font-semibold text-lg rounded-full w-8 h-8 pb-1'
              style={{ backgroundColor: '#60C54B', color: 'white', outline: 'none' }}
            >
              {user?.username[0]}
            </div>

          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-white'>
            <DropdownMenuItem ><p className="text-gray-500">Logged in as {user?.username}</p></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link className="text-gray-500">Accounts</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={handleLogout} variant="outline" className="border border-red-500  py-3 text-red-500 hover:bg-red-600 hover:text-white ">Logout</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>

        </DropdownMenu>
      </div>
    </>

  }
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex items-center justify-between px-10 py-20 lg:py-40 lg:px-100'>
        <Link to='/shop/home' className='flex items-center gap-2' style={{ color: '#60C54B', fontFamily: ' "Lucida Handwriting", cursive' }}>
          <Crown style={{ height: '35px', width: '35px' }} />
          <span className='font-bold text-xl'>Veltrix</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" style={{ backgroundColor: '#60C54B', color: "white" }}>
              <Menu />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-xs bg-white">
            <MenuItems />
            {isAuthenticated ? (
              <>
              <div className='flex flex-row justify-start items-center mt-7'>
              <ShoppingBag className='text-gray-500 w-6 h-6'/>
              <span className='text-sm ml-3 text-gray-700'>Cart</span>
              </div>
              <DropdownMenu>
          <DropdownMenuTrigger className='flex flex-row items-center justify-center gap-3'>
            <div
              className='flex items-center justify-center text-center font-semibold text-lg rounded-full w-8 h-8 pb-1 bg-gray-700 text-white outline-none mt-7'
            >
              {user?.username[0]}
            </div>
          <p className='text-center mt-5 text-sm text-gray-700'>Logged in as {user?.username}</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='bg-white'>
            <DropdownMenuItem>
              <Link className="text-gray-500">Accounts</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button onClick={handleLogout} variant="outline" className="border border-red-500  py-3 text-red-500 hover:bg-red-600 hover:text-white ">Logout</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>

        </DropdownMenu>
              </>

            ) :
              null
            }
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <div>
            <MenuItems />
          </div>
        </div>
        {/* header right content */}
        {!isAuthenticated ? (
          <div className='flex flex-row justify-center items-center gap-7'>
            <Button onClick={() => navigate('/auth/login')} variant="outline" className="py-4 rounded-xl hover:bg-red-500 hover:text-white" onMouseEnter={() => {
              setBgColor('#60C54B'); // green background
              setTextColor('#FFFFFF'); // white text
            }}
              onMouseLeave={() => {
                setBgColor('#FFFFFF'); // revert to default
                setTextColor('#60C54B');
              }}
              style={{
                backgroundColor: bgColor,
                color: textColor,
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #60C54B',
              }}>Sign-in</Button>
            <CircleUserRound style={{ color: '#60C54B', width: '30px', height: '30px', cursor: 'pointer', }} />
          </div>


        ) : <HeaderRightContent />
        }
      </div>
    </header>
  )
}

export default UserHeader
