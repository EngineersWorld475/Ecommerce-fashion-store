import Form from '@/components/common/Form'
import { addCategoryFormElements } from '@/components/config'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from '@/components/ui/table'

const Categories = () => {
    const [openCreateCategoryDialogue, setOpenCreateProductsDialogue] = useState(false)
    const [formData, setFormData] = useState({
        categoryName: ''
    })
    const [categories, setCategories] = useState(null);
    const { toast } = useToast()

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/admin/category/create-category', formData)
            setOpenCreateProductsDialogue(false)
            setCategories([
                ...categories,
                response?.data?.newCategory
            ])
            setFormData({
                categoryName: ''
            })
            toast({
                variant: "destructive",
                title: "Success",
                description: "Category added successfully",
            })
        } catch (error) {
            toast({
                title: 'Error',
                description: error?.message
            })
        }
    }

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

    const deleteCategory = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/category/delete-category/${id}`);
            toast({
                title: "Success",
                description: "Category deleted successfully",
            })
            const newCategories = categories.filter((cat) => cat._id !== response?.data?.deletedCategory?._id)
            setCategories(newCategories)
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
            })
        }
    }

    useEffect(() => {
        getCategories()
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
                        {categories?.map((category) => {
                            return (

                                <TableRow key={category._id}>

                                    <TableCell className="font-medium">{category.categoryName}</TableCell>
                                    <TableCell className="font-medium">
                                        <Button className="bg-red-500 rounded-xl h-15" onClick={() => deleteCategory(category._id)}>Delete</Button>
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
