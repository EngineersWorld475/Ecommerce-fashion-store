import { Crown, Menu } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '../config'

const UserHeader = () => {

  const MenuItems = () => {
    return (
      <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row'>
        {
          shoppingViewHeaderMenuItems.map((menuItem) => {
            return (
              <Link key={menuItem.id} to={menuItem.path} className='text-sm font-md text-gray-600'>
                {menuItem.label }
              </Link>
            )
          })
        }
      </nav>
    )
  }
  const {isAuthenicated} = useSelector(state => state.auth)
  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex items-center justify-between px-10 py-20 lg:py-40 lg:px-100'>
        <Link to='/shop/home' className='flex items-center gap-2' style={{color: '#60C54B', fontFamily: ' "Lucida Handwriting", cursive'}}>
        <Crown style={{height: '35px', width: '35px'}} />
          <span className='font-bold text-xl'>Veltrix</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" style={{backgroundColor: '#60C54B', color: "white"}}>
              <Menu />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-xs bg-white">
            <MenuItems />
          </SheetContent>
        </Sheet>
        <div className='hidden lg:block'>
          <div>
            <MenuItems />
          </div>
            {
              isAuthenicated ? <div>
              </div> : null
             }
          
        </div>
      </div>
    </header>
  )
}

export default UserHeader
