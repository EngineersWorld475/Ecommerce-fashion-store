import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

const ProductTile = ({ product, setFormData, setOpenCreateProductsDialogue, setCurrentProductId, handleDelete }) => {
  const [openDeleteProductsDialogue, setOpenDeleteProductsDialogue] = useState(false)
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div>
       {/* Fixed Image Container */}
       <div className="relative w-full h-[300px] bg-gray-100 overflow-hidden">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover"
          />
        </div>
        {/* confirm delete section */}
        <div>
        <Sheet open={openDeleteProductsDialogue} onOpenChange={() => {
        setOpenDeleteProductsDialogue(false)
      }}>
        <SheetContent side="top" className="overflow-auto bg-white">
          <SheetHeader>
            <SheetTitle className="text-center mb-2">Dlete Product</SheetTitle>
          </SheetHeader>
          <p className='text-center mb-3 text-gray-500'>Are you sure you want to delete this product?</p>
          <div className='flex items-center justify-center gap-3  w-full'>
            <Button onClick={() => handleDelete(product?._id)} className="w-1/4 bg-gray-700">Yes</Button>
            <Button onClick={() => setOpenDeleteProductsDialogue(false)} className="w-1/4 bg-gray-700">Cancel</Button>
          </div>
        </SheetContent>
      </Sheet>
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">
            {product?.title}
          </h2>
          <div className="flex items-center justify-between mb-2">
            {product?.salePrice > 0 ? (
              <>
                <span className="text-lg font-semibold text-gray-500 line-through">
                  ${product?.price}
                </span>
                <span className="text-lg font-bold text-green-600">
                  ${product?.salePrice}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">
                ${product?.price}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex gap-3 items-center p-4">
          <Button className="text-white rounded-xl bg-gray-900 w-1/2" onClick={() => {
            setOpenCreateProductsDialogue(true)
            setCurrentProductId(product?._id) 
            setFormData(product)
          }}>
            Edit
          </Button>
          <Button className="bg-gray-900 text-white hover:bg-red-600 rounded-xl w-1/2" onClick={() => setOpenDeleteProductsDialogue(true)}>
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductTile;
