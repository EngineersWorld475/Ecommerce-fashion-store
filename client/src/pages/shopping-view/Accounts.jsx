import React from 'react'
import accountsBanner from '../../assets/veltrix-accounts-banner.jpg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OrdersList from '@/components/shopping-view/OrdersList';
import AddressList from '@/components/shopping-view/AddressList';

const Accounts = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <div className='relative w-full h-[100px] lg:h-[300px] shadow-xlg'>
        <img src={accountsBanner} alt="accounts-banner" className='w-full h-full object-cover' />
      </div>
      <div className='mx-4 lg:mx-9'>
        <Tabs defaultValue="orders" className="flex flex-col w-[400px]">
          <TabsList className="p-7 text-green-400">
            <TabsTrigger value="orders" className="text-red-400">Orders</TabsTrigger>
            <TabsTrigger value="address" className="text-red-400">Address</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <OrdersList />
          </TabsContent>
          <TabsContent value="address">
            <AddressList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Accounts
