import Form from '@/components/common/Form'
import { addCategoryFormElements } from '@/components/config'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from '@/components/ui/table'
import { useDispatch, useSelector } from 'react-redux'
import { AddCategory, deleteCategory, getCategories } from '@/store/admin/category-slice'

const Categories = () => {
    const [openCreateCategoryDialogue, setOpenCreateProductsDialogue] = useState(false)
    const [formData, setFormData] = useState({
        categoryName: ''
    })
    const [categories, setCategories] = useState(null);
    const { toast } = useToast()
    const dispatch = useDispatch()
    const { listOfCategories } = useSelector((state) => state.adminCategories)


    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(AddCategory(formData)).then((data) => {
                if(data?.payload?.success) {
                    dispatch(getCategories())
                    setFormData({
                        categoryName: ''
                    })
                    setOpenCreateProductsDialogue(false)
                    toast({
                        variant: "destructive",
                        title: "Success",
                        description: "Category added successfully",
                    })
                }
                
            })
            
        } catch (error) {
            toast({
                title: 'Error',
                description: error?.message
            })
        }
    }


    const onDelete = async (id) => {
        try {
            dispatch(deleteCategory(id)).then((data) => {
                if(data?.payload?.success) {
                    dispatch(getCategories())
                    toast({
                        title: "Success",
                        description: "Category deleted successfully",
                    })
                }
            })
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
            })
        }
    }

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    return (
        <div className='w-full h-80vh flex flex-col'>
            <div className='flex w-full justify-end mb-5' style={{ paddingRight: '50px' }}>
                <Button className="bg-black text-white h-15" onClick={() => setOpenCreateProductsDialogue(true)}>Add Category</Button>
            </div>
            <div>
                <Table>
                    <TableCaption>Product Categories</TableCaption>
                    <TableHead>
                        <TableRow>
                            <TableHead className="w-[300px]">Category Name</TableHead>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listOfCategories?.categories?.map((category) => {
                            return (

                                <TableRow key={category._id}>

                                    <TableCell className="font-medium">{category.categoryName}</TableCell>
                                    <TableCell className="font-medium">
                                        <Button className="bg-red-500 rounded-xl h-15" onClick={() => onDelete(category._id)}>Delete</Button>
                                    </TableCell>

                                </TableRow>

                            )
                        })}

                    </TableBody>
                </Table>
            </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                <Sheet open={openCreateCategoryDialogue} onOpenChange={setOpenCreateProductsDialogue}>
                    <SheetContent side="right" className="overflow-auto bg-white">
                        <SheetHeader>
                            <SheetTitle>Add New Category</SheetTitle>
                            <Form formControls={addCategoryFormElements} formData={formData} setFormData={setFormData} buttonText='Add' onSubmit={onSubmit} />
                        </SheetHeader>
                    </SheetContent>

                </Sheet>
            </div>

        </div>
    )
}

export default Categories
