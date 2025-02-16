import { getCategories } from '@/store/admin/category-slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

const ProductFilter = () => {
  const dispatch = useDispatch();
  const { listOfCategories } = useSelector((state) => state.adminCategories);
  const filterOptions = {
    category: listOfCategories?.categories?.map((category) => {
      return (
        {
          id: category._id,
          label: category.categoryName
        }
      )
    }),
    brand: [
      { id: 'nike', label: 'Nike' },
      { id: 'adidas', label: 'Adidas' },
      { id: 'puma', label: 'Puma' },
      { id: 'levi', label: 'Levi' },
      { id: 'zara', label: 'Zara' },
      { id: 'h&m', label: 'H&M' }
    ]
  }
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
  return (
    <>
      <div className='flex flex-col justify-start border gap-5'>
        <div style={{ backgroundColor: '#60C54B', color: 'white' }}>
          <h1 className='px-5 py-2 font-bold text-xl'>Filters</h1>
        </div>
        <div className='p-4 space-y-4'>
          {Object.keys(filterOptions).map((keyItem) => (
            <>
              <div>
                <h3 className='text-base font-bold mt-5'>{keyItem}</h3>
                <div className='grid gap-2 mt-2'>
                  {
                    filterOptions[keyItem]?.map((option) => <Label className="flex items-center gap-2 font-normal">
                      <Checkbox />
                      {option?.label}
                    </Label>)
                  }
                </div>
              </div>
            </>
          ))}
        </div>
      </div>

    </>
  )
}

export default ProductFilter
