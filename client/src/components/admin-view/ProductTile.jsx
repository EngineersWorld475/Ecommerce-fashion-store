import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';

const ProductTile = ({ product }) => {
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
        <CardFooter className="flex justify-between items-center p-4">
          <Button className="text-white rounded-full">
            Edit
          </Button>
          <Button className="bg-red-500 text-white hover:bg-red-600 rounded-full">
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProductTile;
