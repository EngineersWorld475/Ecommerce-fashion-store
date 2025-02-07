import { Button } from '@/components/ui/button';
import { fetchProductDetails } from '@/store/shop/product-details-slice';
import { StarIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ProductDetailsDialog = () => {
  const dispatch = useDispatch()
  const { id } = useParams();
  const { productDetails } = useSelector((state) => state.shoppingProductDetails);

  useEffect(() => {
    dispatch(fetchProductDetails(id))
  }, [])
  return (
    <div className='flex flex-col lg:flex-row gap-5 justify-center align-center p-6 lg:p-8'>
      <div className='relative flex flex-1 justify-center items-center overflow-hidden h-[400px]'>
        <img src={productDetails?.image} alt={productDetails?.title} className='object-cover' />
      </div>
      <div className='flex flex-1 flex-col'>
        <h1 className='text-3xl font-bold mb-5 text-gray-800'>{productDetails?.title}</h1>
        <p className='max-w-[500px] text-gray-700 mb-3'>{productDetails?.description}</p>
        <div className='flex justify-between items-center max-w-[500px] p-3'>
          <div className='flex flex-col gap-3'>
            <h1 className={`${productDetails?.salePrice > 0 ? 'line-through' : ''} text-3xl text-red-500`}>${productDetails?.price}</h1>
            <div className='flex flex-row gap-2 mb-3 cursor-pointer'>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <span className='text-gray-500'>(4.5)</span>
            </div>
          </div>
          <h1 className='text-3xl text-green-500'>${productDetails?.salePrice}</h1>
        </div>
        <div className='max-w-[500px] mb-5'>
          <Button className="w-full h-15 bg-gray-700">Add to Cart</Button>
        </div>
        <div className='max-w-[500px] h-0.5 bg-gray-300 mb-3'></div>
        <h2 className='text-xl font-semibold mb-5'>Reviews</h2>
        <div className='flex flex-row gap-3 items-center'>
          <div>
            <h2 className='text-lg font-semibold text-white rounded-full bg-black px-3 py-0.5'>S</h2>
          </div>
          <div className='flex flex-col gap-2 justify-start'>
            <h3 className='text-sm font-semibold text-gray-800'>Sanjay G Nair</h3>
            <div className='flex flex-row gap-2 mb-0 cursor-pointer'>
              <StarIcon size={15} />
              <StarIcon size={15} />
              <StarIcon size={15} />
              <StarIcon size={15} />
              <StarIcon size={15} />
            </div>
            <div>
            <p className='text-sm text-gray-700'>Awesome product...</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsDialog
