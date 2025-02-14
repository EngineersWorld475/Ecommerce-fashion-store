import React, { useState } from 'react'
import Form from '../common/Form'
import { addressFormControls } from '../config'
import { useDispatch, useSelector } from 'react-redux'
import { createAddress, fetchAddress } from '@/store/shop/address-slice'
import { toast } from 'react-toastify'

const AddressList = () => {
  const { user } = useSelector((state) => state.auth)
  const { addressList } = useSelector((state) => state.address)
  const [addressFormData, setAddressFormData] = useState({
    userId: user?.id,
    address: '',
    pincode: '',
    phone: '',
    notes:''
  }
  )
  const notifySuccess = () => toast(<p className='text-green-500 text-sm'>Address added successfully</p>);
  const notifyError = () => toast(<p className='text-red-500 text-sm'>Can't add address!!! please try again later</p>);

  const dispatch = useDispatch();

  const handleSubmitAddressForm = (e) => {
    e.preventDefault();
    dispatch(createAddress(addressFormData)).then((result) => {
      if(result?.payload?.success) {
        notifySuccess();
        dispatch(fetchAddress(result?.payload?.data?.userId))
        setAddressFormData({
          address: '',
          pincode: '',
          phone: '',
          notes: ''   
         })
      } else {
        notifyError()
      }
    })
    
  }

  return (
    <div className='flex flex-col relative justify-center items-center py-5 w-full border border-gray-700 shadow-md'>
      <h1 className='text-xl font-bold mb-5'>Delivery Address</h1>
      <div className='w-full p-4'>
      <Form formControls={addressFormControls} formData={addressFormData} setFormData={setAddressFormData} buttonText={'Add Address'} onSubmit={handleSubmitAddressForm}/>
      </div>
    </div>
  )
}

export default AddressList
