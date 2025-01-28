import { BadgeCheck, ChartNoAxesCombined, LayoutDashboard, ShoppingBasket } from 'lucide-react'
import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSidebar = () => {
  const navigate = useNavigate()

  const adminSidebarMenuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboard />
    },
    {
      id: 'products',
      label: 'Products',
      path: '/admin/products',
      icon: <ShoppingBasket />
    },
    {
      id: 'orders',
      label: 'Orders',
      path: '/admin/orders',
      icon: <BadgeCheck />
    }
  ]

  const menuItems = () => {
    return (
      <nav className='mt-8 flex flex-col gap-2'>
        {adminSidebarMenuItems?.map((menuItem) => {
          return (
            <div key={menuItem.id} onClick={() => navigate(menuItem.path)} className='flex items-center gap-2 rounded-xl px-3 py-2 border hover:bg-gray-700 hover:text-white cursor-pointer'>
              {menuItem.icon}
              <span>{menuItem.label}</span>
            </div>
          )
        })}
      </nav>
    )
  }
  return (
    <Fragment>
      <aside className='hidden w-60 flex-col border-r bg-background p-6 lg:flex'>
        <div onClick={() => navigate('/admin/dashboard')} className='flex items-center gap-2s justify-center gap-2 cursor-pointer'>
          <ChartNoAxesCombined />
          <h1 className='text-xl font-extrabold'>Admin panel</h1>
        </div>
        {menuItems()}
      </aside>
    </Fragment>
  )
}

export default AdminSidebar
