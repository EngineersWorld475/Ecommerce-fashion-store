import React, { useEffect, useState } from 'react'
import bannerOne from '../../assets/VT-BANNER-1.webp'
import bannerTwo from '../../assets/VT-BANNER-2.webp'
import bannerThree from '../../assets/VT-BANNER-3.webp'
import { BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, ShirtIcon, UmbrellaIcon, WatchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCategories } from '@/store/admin/category-slice'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent } from '@/components/ui/card'
import { SiNike } from "react-icons/si";
import { SiAdidas } from "react-icons/si";
import { SiPuma } from "react-icons/si";
import { FaCuttlefish } from "react-icons/fa";
import { SiZara } from "react-icons/si";
import { SiHandm } from "react-icons/si";
import { useNavigate } from 'react-router-dom'
import { fetchAllFiteredProducts } from '@/store/shop/product-slice'
import ShoppingProductTile from '@/components/shopping-view/ProductTile'
import { fetchProductDetails } from '@/store/shop/product-details-slice'




const Home = () => {
  const slides = [bannerOne, bannerTwo, bannerThree]
  const dispatch = useDispatch()
  const {listOfCategories} = useSelector((state) => state.adminCategories);
  const { productList } = useSelector((state) => state.shoppingProducts);
  const [currentSlide, setCurrentSlide] = useState(0)
  const icons = [ShirtIcon, CloudLightning, BabyIcon, WatchIcon, UmbrellaIcon];
  const [hideCartButton, setHideCartButton] = useState(true)
  const navigate = useNavigate()

  const handleNavigateToCategoryList = (getCurrenItem, section) => {
    sessionStorage.removeItem('filters');
    const currentFilter =  {
      [section] : [getCurrenItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate(`/shop/listing`)
  }

  const handleNavigateToBrandList = (getCurrentItem, section) => {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section] : [getCurrentItem.id]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }

  const getProductDetails = (getCurrentProductId) => {
      dispatch(fetchProductDetails(getCurrentProductId)).then((result) => {
        if(result?.payload?.success) {
          navigate(`/shop/product-details/${result?.payload?.data?._id}`)
        }
      })
    }



    const categoriesWithIcon = listOfCategories?.categories?.map((category, index) => {
      return {
        id: category._id,
        label: category.categoryName,
        icon: icons[index % icons.length],
      };
    });

    const bandsWithIcon = [
      { id: 'nike', label: 'Nike', icon: SiNike },
      { id: 'adidas', label: 'Adidas',  icon: SiAdidas },
      { id: 'puma', label: 'Puma', icon: SiPuma },
      { id: 'levi', label: 'Levi', icon: FaCuttlefish },
      { id: 'zara', label: 'Zara', icon: SiZara },
      { id: 'h&m', label: 'H&M', icon: SiHandm }
    ]
    

    useEffect(() => {
      dispatch(getCategories())
    }, [dispatch])

    // for changing banner automatically
    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide(prevSlide => (prevSlide + 1)% slides.length) 
      }, 5000)

      return () => clearInterval(timer)
    }, [])

    useEffect(() => {
      dispatch(fetchAllFiteredProducts({
        filterParams: {
          brand: ['puma', 'adidas']
        },
        sortParams: ''
      }))
    }, [dispatch])


  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative h-[200px] lg:h-[600px] lg:w-full overflow-hidden'>
        {
          slides?.map((slide, index) => (
            <img src={slide} key={index} alt='banner' className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-fill lg:object-cover transition-opacity duration-1000`}/>
          ) )
        }
        <Button variant="outline" size="icon" className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray/80 p-5 border-none" onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length ) % slides.length)}>
        <ChevronLeftIcon className='w-4 h-4' />
        </Button>
        <Button variant="outline" size="icon" className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray/80 p-5 border-none" onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}>
        <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>
      {/* category section */}
      <section className='py-6 lg:py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-xl lg:text-3xl font-bold text-center mb-8'>Shop by Category</h2>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
            {categoriesWithIcon?.map((categoryItem) => (
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleNavigateToCategoryList(categoryItem, 'category')}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-[50px] h-[50px] mb-4 text-primary mb-2" />
                  <span className='text-gray-600 font-bold'>{categoryItem?.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* brands section */}
      <section className='py-6 lg:py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-xl lg:text-3xl font-bold text-center mb-8'>Shop by Brand</h2>
          <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
            {bandsWithIcon?.map((brandItem) => (
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleNavigateToBrandList(brandItem, 'brand')}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-[50px] h-[50px] mb-4 text-primary mb-2" />
                  <span className='text-gray-600 font-bold'>{brandItem?.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* featured product section */}
      <section className='py-6 lg:py-12 bg-gray-50'>
      <div className='container mx-auto px-4'>
      <h2 className='text-xl lg:text-3xl font-bold text-center mb-8'>Featured Products</h2>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-3'>
              {productList && productList.length > 0 && productList?.map((product) => (
                <ShoppingProductTile product={product} getProductDetails={getProductDetails} hideCartButton={hideCartButton}/>
              ))}
            </div>
      </div>
      </section>
    </div>
  )
}

export default Home
