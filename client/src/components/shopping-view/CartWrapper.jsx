import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import { Button } from '../ui/button'
import CartItemsContent from './CartItemsContent'

const CartWrapper = ({ cartItems }) => {

    return (
        <SheetContent side="right" className="sm:max-w-md bg-white">
            <SheetHeader>
                <SheetTitle className='text-center'>Your Cart</SheetTitle>
            </SheetHeader>
            <div className='mt-8 space-y-4'>
                {cartItems && cartItems.length > 0 && (
                    cartItems.map((item) =>
                        <CartItemsContent cartContent={item} />

                    )
                )}
            </div>
            <div className='mt-8 space-y-4'>
                <div className='flex justify-between'>
                    <span className='font-bold'>Total</span>
                    <span className='font-bold'>$1000</span>
                </div>
            </div>
            <Button className='w-full h-15 mt-5 bg-gray-700 rounded-[5px]'>Checkout</Button>
        </SheetContent>
    )
}

export default CartWrapper
