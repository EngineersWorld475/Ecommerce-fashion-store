import ProductImageUpload from '@/components/admin-view/ProductImageUpload'
import ProductTile from '@/components/admin-view/ProductTile'
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useToast } from '@/hooks/use-toast'
import { getCategories } from '@/store/admin/category-slice'
import { addNewProduct, deleteProduct, editProduct, getProducts } from '@/store/admin/products-slice'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Products = () => {
  const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salesPrice: '',
    totalStock: ''
  }
  const [openCreateProductsDialogue, setOpenCreateProductsDialogue] = useState(false);
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [imageLoadingState, setImageLoadingState] = useState(false)
  const [currentProductId, setCurrentProductId] = useState(null)
  const [categories, setCategories] = useState([])
  const {listOfCategories} = useSelector((state) => state.adminCategories)

  const dispatch = useDispatch()
  const { listOfProducts } = useSelector((state) => state.adminProducts)
  const { toast } = useToast()


  const categoryOptions = listOfCategories?.categories?.map((cat) => {
    return (
      {
        id: cat._id,
        label: cat.categoryName
      }
    )
  })

  const addProductFormElements = [
    {
      label: 'Title',
      name: 'title',
      componentType: 'input',
      type: 'text',
      placeholder: "Enter product title"
    },
    {
      label: 'Description',
      name: 'description',
      componentType: 'textarea',
      placeholder: 'Enter product description'
    },
    {
      label: 'Category',
      name: 'category',
      componentType: 'select',
      placeholder: 'Select Category',
      options: categoryOptions
    },
    {
      label: 'Brand',
      name: 'brand',
      componentType: 'select',
      placeholder: 'Select Brand',
      options: [
        { id: 'nike', label: 'Nike' },
        { id: 'adidas', label: 'Adidas' },
        { id: 'puma', label: 'Puma' },
        { id: 'levi', label: "Levi's" },
        { id: 'zara', label: 'Zara' },
        { id: 'h&m', label: 'H&M' },
      ]
    },
    {
      label: 'Price',
      name: 'price',
      componentType: 'input',
      type: 'number',
      placeholder: 'Enter products price'
    },
    {
      label: 'Enter sale price',
      name: 'salePrice',
      componentType: 'input',
      type: 'number',
      placeholder: 'Enter sale price(optional)'
    },
    {
      label: 'Total Stock',
      name: 'totalStock',
      componentType: 'input',
      type: 'number',
      placeholder: 'Enter total stock'
    }
  ]

  function isFormValid() {
    return Object.keys(formData).map((key) => formData[key] !== '').every((item)=> item);
  }


  const onSubmit = (e) => {
    e.preventDefault()
    if(currentProductId !== null) {
      dispatch(editProduct({id: currentProductId, formData})).then((result) => {
        dispatch(getProducts())
        setFormData(initialFormData)
        setCurrentProductId(null)
        toast({
          title: 'Product edited successfully'
        })
        setOpenCreateProductsDialogue(false)
      })
    } else {
      dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl
      })).then((result => {
        if (result?.payload?.success) {
          dispatch(getProducts())
          setOpenCreateProductsDialogue(false);
          setImageFile(null)
          setFormData(initialFormData)
          toast({
            title: 'Product added successfully'
          })
        }
      }))
    }
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((result) => {
      dispatch(getProducts())
      toast({
        title: 'Product deleted successfully'
      })
    })
  }

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])
  return (
    <>
      <div className='flex mb-5 w-full justify-end'>
        <Button onClick={() => setOpenCreateProductsDialogue(true)} className="bg-black h-15">Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {listOfProducts && listOfProducts.data && listOfProducts.data.length > 0 ? listOfProducts.data.map((productItem) => <ProductTile key={productItem?._id} setCurrentProductId={setCurrentProductId}  setOpenCreateProductsDialogue={setOpenCreateProductsDialogue} setFormData={setFormData} product={productItem} handleDelete={handleDelete} />) : 
          <div>
            <h3>Loading....</h3>
          </div>
        }
      </div>
      <Sheet open={openCreateProductsDialogue} onOpenChange={() => {
        setOpenCreateProductsDialogue(false)
        setCurrentProductId(null)
        setFormData(initialFormData)
      }}>
        <SheetContent side="right" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle>{currentProductId ? 'Edit product' : 'Add New Product'}</SheetTitle>
          </SheetHeader>
          <ProductImageUpload file={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} imageLoadingState={imageLoadingState} isEditMode={currentProductId !== null} />
          <div className='py-6'>
            <Form  formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText={currentProductId ? 'Edit' : 'Add'} onSubmit={onSubmit} />
          </div>
        </SheetContent>
      </Sheet>
    </>

  )
}

export default Products
