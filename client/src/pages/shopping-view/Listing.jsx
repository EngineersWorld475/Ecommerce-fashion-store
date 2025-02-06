import { sortOptions } from '@/components/config'
import ProductFilter from '@/components/shopping-view/ProductFilter'
import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { ArrowUpDownIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFiteredProducts } from '../../store/shop/product-slice';
import ShoppingProductTile from '@/components/shopping-view/ProductTile';
import { useSearchParams } from 'react-router-dom';

const Listing = () => {

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()


  const dispatch = useDispatch();
  const { isLoading, productList } = useSelector((state) => state.shoppingProducts)

  // sort function
  const handleSort = (value) => {
    setSort(value)
  }

  //filter function
  const handleFilter = (getSectionId, getCurrentOption) => {
    let cpyFilters = { ...filters };
    // Finds the index of getSectionId in the current filter keys.
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId)

    // Checks if getSectionId doesn't exist in the current filters. If no filter for that section exists, create a new one.
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      // Finds the position of getCurrentOption inside the existing filter list for that section. Helps check if the option already exists.
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        // Adds getCurrentOption if it doesn't already exist.
        cpyFilters[getSectionId].push(getCurrentOption)
      } else {
        // Removes the existing filter option by its index if it's already present.
        cpyFilters[getSectionId].splice(indexOfCurrentOption, 1)
      }
    }
    setFilters(cpyFilters)
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  // building a query string from the filters object 
  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(',')
        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    return queryParams.join('&')
  }

  // fetch list of products
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(fetchAllFiteredProducts({ filterParams: filters, sortParams: sort }))
    }
  }, [dispatch, filters, sort])

  useEffect(() => {
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {})
  }, [])

  useEffect(() => {

    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString))
    }
  }, [filters])

  console.log(filters, sort)
  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
        <ProductFilter filters={filters} handleFilter={handleFilter} />
        <div>
          <div>
            <div className='flex items-center justify-between'>
              <h1 className='text-lg font-semibold'>All Products</h1>
              <div className='flex flex-row justify-center items-center gap-5'>
                <h2 className='text-gray-500 text-md'>{productList?.length} Products</h2>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border border-gray-200 flex items-center gap-2">
                      <ArrowUpDownIcon />
                      <span>Sort by</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end' className='w-[200px] z-40 bg-white'>
                    <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                      {sortOptions.map((sortItem) => <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id} className='cursor-pointer text-sm mt-2 hover:bg-gray-700 px-2 transition-all duration-200 hover:text-white hover:py-2 hover:outline-none'>{sortItem.label}</DropdownMenuRadioItem>)}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4'>
            {isLoading ? (
              <div className='col-span-full flex justify-center items-center'>
                <h2 className='text-gray-500 text-lg'>Loading products...</h2>
              </div>
            ) : productList && productList.length > 0 ? (
              productList.map((product) => (
                <ShoppingProductTile key={product.id || product._id} product={product} />
              ))
            ) : (
              <div className='col-span-full flex justify-center items-center'>
                <h2 className='font-semibold text-xl text-gray-600'>
                  No products found for the selected sort option. Please try a different one.
                </h2>
              </div>
            )}
          </div>

        </div>
      </div>

    </>
  )
}

export default Listing
