import ProductImageUpload from '@/components/admin-view/ProductImageUpload'
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

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
  const [categories, setCategories] = useState([])

  const getCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/category/get-categories')
      if (response?.data?.categories) {
        setCategories(response.data.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const categoryOptions = categories.map((cat) => {
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



  const onSubmit = () => {

  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <>
      <div className='flex mb-5 w-full justify-end'>
        <Button onClick={() => setOpenCreateProductsDialogue(true)} className="bg-black">Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        <Sheet open={openCreateProductsDialogue} onOpenChange={setOpenCreateProductsDialogue}>
          <SheetContent side="right" className="overflow-auto bg-white">
            <SheetHeader>
              <SheetTitle>Add New Product</SheetTitle>
            </SheetHeader>
            <ProductImageUpload file={imageFile} setFile={setImageFile} uploadedImageUrl={uploadedImageUrl} setUploadedImageUrl={setUploadedImageUrl} setImageLoadingState={setImageLoadingState} />
            <div className='py-6'>
              <Form formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText='Add' onSubmit={onSubmit} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>

  )
}

export default Products
