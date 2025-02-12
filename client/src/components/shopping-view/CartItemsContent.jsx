import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItem, updateCart } from '@/store/shop/cart-slice'
import { toast } from 'react-toastify'

const CartItemsContent = ({cartContent}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth)

  const handleDeleteCartItem = (cartContent) => {
    dispatch(deleteCartItem({
      userId: user?.id,
      productId: cartContent?.productId
    }))
    .then((result) => {
      if (result?.payload?.success) {
        toast(
          <p className='text-red-500'>Cart item deleted</p>
        );
      }
    });
  };

  // updating the product quantity

  const handleUpdateQuantity = (getCartItem, typeOfAction) => {
    dispatch(updateCart({
      userId: user?.id,
      productId: cartContent?.productId,
      quantity: typeOfAction === 'plus' ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
    })).then((result) => {
      console.log(result)
    })
  }


  return (
    <div className='mt-8 space-y-4'>
      <div className='flex items-center space-x-4'>
            <img src={cartContent?.image} alt={cartContent?.title} className='w-[50px] h-[50px] rounded object-cover' />
            <div className='flex-1'>
              <h1 className='text-sm font-bold text-gray-700'>{cartContent?.title}</h1>
              <div className='flex items-center mt-2 gap-3'>
                <Button variant='outline' size='icon' disabled={cartContent?.quantity === 1} className="bg-transparent text-gray-700 hover:bg-transparent px-2 py-1 border-none" onClick={() => handleUpdateQuantity(cartContent, "minus")}>
                  <Minus />
                </Button>
                <span className='text-gray-900 text-sm'>{cartContent?.quantity}</span>
                <Button variant='outline' size='icon' className="bg-transparent text-gray-700 hover:bg-transparent  px-2 py-1 border-none" onClick={() => handleUpdateQuantity(cartContent, "plus")}>
                  <Plus />
                </Button>
              </div>
            </div>
            <div className='flex flex-col items-end'>
              <p className='text-sm text-gray-700'>{((cartContent?.salePrice > 0 ? cartContent?.salePrice : cartContent?.salePrice) * cartContent.quantity).toFixed(2)}</p>
              <Trash onClick={() => handleDeleteCartItem(cartContent)} size={20} className='text-gray-700 cursor-pointer'/>
            </div>
          </div>
    </div>
  )
}

export default CartItemsContent
