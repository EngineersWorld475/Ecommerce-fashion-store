import { sortOptions } from '@/components/config'
import ProductFilter from '@/components/shopping-view/ProductFilter'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ArrowUpDownIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchAllFiteredProducts} from '../../store/shop/product-slice';
import ShoppingProductTile from '@/components/shopping-view/ProductTile';

const Listing = () => {

  const dispatch =  useDispatch();
      const { productList } = useSelector((state) => state.shoppingProducts)

  // fetch list of products
      useEffect(() => {
          dispatch(fetchAllFiteredProducts())
      }, [dispatch])
console.log(productList)
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
        <ProductFilter />
        <div>
          <div>
            <div className='flex items-center justify-between'>
              <h1 className='text-lg font-semibold'>All Products</h1>
              <div className='flex flex-row justify-center items-center gap-5'>
                <h2 className='text-gray-500 text-md'>10 Products</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border border-gray-200 flex items-center gap-2">
                      <ArrowUpDownIcon />
                      <span>Sort by</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-[200px] z-40 bg-white'>
                    <DropdownMenuRadioGroup>
                      {sortOptions.map((sortItem) => <DropdownMenuRadioItem key={sortItem.id} className='cursor-pointer text-sm mt-2 hover:bg-gray-700 px-2 transition-all duration-200 hover:text-white hover:py-2 hover:outline-none'>{sortItem.label}</DropdownMenuRadioItem>)}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4'>
            {productList && productList.length > 0 ? (
              productList?.map((product) => {
                return (
                  <ShoppingProductTile product={product} />
                )
              })
            ) :
            <div className='font-semibold text-xl'>
              Loading....
            </div>
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default Listing
