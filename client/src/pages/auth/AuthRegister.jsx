import CommonForm from '@/components/common/Form'
import { registerFormControls } from '@/components/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AuthRegister = () => {
  const initailState = {
    username: '',
    email: '',
    password: ''
  }
  
  const onSubmit = () => {

  }
  const [formData, setFormData] = useState(initailState)
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className='mt-2'>Already have an account <Link className='font-medium text-primary ml-2 hover:underline' to="/auth/login">Login</Link></p>
      </div>
      <CommonForm formControls={registerFormControls} buttonText={'Sign up'} formData={formData} setFormData={setFormData} onSubmit={onSubmit}/>
    </div>
  )
}

export default AuthRegister
