import React from 'react'
import { Button } from '../ui/button'
import { AlignJustify, LogOut } from 'lucide-react'

const AdminHeader = () => {
  return (
    <header className="flex items-center justify-between px-4 py-4 bg-background border-b">
      <Button className="lg:hidden sm:block">
        <AlignJustify />
        <span className='sr-only'>Toggle menu</span>
      </Button>
      <div className='flex flex-1 justify-end'>
        <Button className="inline-flex gap-2 bg-black rounded-xl text-sm shadow">
        <LogOut />
          
          Logout</Button>
      </div>
    </header>
  )
}

export default AdminHeader
