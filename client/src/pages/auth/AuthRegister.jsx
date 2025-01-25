import CommonForm from '@/components/common/Form'
import { registerFormControls } from '@/components/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const AuthRegister = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading} = useSelector((state) => state.auth);

  const initailState = {
    username: '',
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(initailState)
  
  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then(() => navigate('/auth/login'))

  }
  console.log(formData)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className='mt-2'>Already have an account <Link className='font-medium text-primary ml-2 hover:underline' to="/auth/login">Login</Link></p>
      </div>
      <CommonForm formControls={registerFormControls} buttonText={isLoading ? 'Loading...' : 'Sign up'} formData={formData} setFormData={setFormData} onSubmit={onSubmit}/>
    </div>
  )
}

export default AuthRegister
