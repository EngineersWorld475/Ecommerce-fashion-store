import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'

const ProductImageUpload = ({ file, setFile, uploadedImageUrl, setUploadedImageUrl, setImageLoadingState }) => {
  const inputRef = useRef(null)

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files[0]
    console.log('...selectedFile', selectedFile)
    if (selectedFile) {
      setFile(selectedFile)
      console.log(file)
    }

  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0];
    console.log('...droppedFile', droppedFile)
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const handleRemoveImage = () => {
    setFile(null)
    if (inputRef.current) {
      console.log(inputRef.current.value)
      inputRef.current.value = ''
    }
  }

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true)
    const data = new FormData();
    data.append('my_file', file);
    const response = await axios.post('http://localhost:5000/api/admin/products/upload-image', data)
    if(response?.data?.success) {
      setUploadedImageUrl(response.data.result.url)
      setImageLoadingState(false)
    }
  }

  useEffect(() => {
    if(file !== null) {
      uploadImageToCloudinary()
    }
  }, [file])
  console.log('...file',file)
  console.log('...uploadedurl',uploadedImageUrl)

  return (
    <> 
      <div className='w-full max-w-md mx-auto mt-10'>
        <Label className="text-md font-semibold block">Upload image</Label>
      </div> 
      <div onDragOver={handleDragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-xl p-4 mt-3'>
        <Input type="file" id='upload-image' className="hidden" ref={inputRef} onChange={handleImageFileChange} />
        {
          !file ? <Label htmlFor="upload-image" className="flex flex-col justify-center items-center h-32 cursor-pointer">
            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
            <span>drag & drop or click to upload</span>
          </Label> : <div className='flex items-cener justify-between'>
            <div className='flex items-center'>
              <FileIcon className='w-7 h-7 text-primary mr-2' />
            </div>
            <p className='text-sm font-medium'>
              {file.name}
            </p>
            <Button varient="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
              <XIcon className='w-4 h-4' />
              <span className='sr-only'>Remove File</span>
            </Button>
          </div>
        } 
      </div>
    </>
  )
}

export default React.memo(ProductImageUpload)
