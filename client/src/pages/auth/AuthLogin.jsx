import CommonForm from '@/components/common/Form'
import { loginFormControls } from '@/components/config'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const AuthLogin = () => {
  const initailState = {
    email: '',
    password: ''
  }

  const [formData, setFormData] = useState(initailState)
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)
  const navigate = useNavigate()



  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  const onSubmit = (event) => {
    event.preventDefault()
    if (validateForm()) {
      dispatch(loginUser(formData)).unwrap().then((result) => {
        if (result.user.role === 'user') {
          navigate('/shop/home')
        } else {
          navigate('/admin/dashboard')
        }
      }).catch((error) => {
        console.log('Error during registration:', error);
      })
    }

  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your account</h1>
        <p className='mt-2'>Don't have an account <Link className='font-medium text-primary ml-2 hover:underline' to="/auth/register">Register</Link></p>
      </div>
      <CommonForm formControls={loginFormControls} buttonText={isLoading ? 'Loading...' : 'Sign in'} formData={formData} setFormData={setFormData} onSubmit={onSubmit} validationErrors={validationErrors} />
      {error && (
        <p className='mt-4 text-red-500 text-foreground font-sm text-center'>{error}</p>
      )}
    </div>
  )
}

export default AuthLogin
