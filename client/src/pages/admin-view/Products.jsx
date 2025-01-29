import Form from '@/components/common/Form'
import { addProductFormElements } from '@/components/config'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React, { useState } from 'react'

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
  const onSubmit = () => {
    
  }
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
          <div className='py-6'>
            <Form formControls={addProductFormElements} formData={formData} setFormData={setFormData} buttonText='Add' onSubmit={onSubmit}/>
          </div>
        </SheetContent>
      </Sheet>
    </div>
    </>

  )
}

export default Products
