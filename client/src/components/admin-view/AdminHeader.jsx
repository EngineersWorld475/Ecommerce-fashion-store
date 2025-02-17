import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-slice'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({setOpen}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const  handleLogout = () => {
    dispatch(logoutUser()).then((result) => {
      navigate('/auth/login')
    })
  }
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block bg-red-500 rounded-xl h-15">
        <AlignJustify />
        <span className='sr-only'>Toggle menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button className="inline-flex gap-2 bg-black rounded-xl text-sm shadow h-15" onClick={handleLogout}>
        <LogOut />
          
          Logout</Button>
      </div>
    </header>
  )
}

export default React.memo(AdminHeader)
