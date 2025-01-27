import CommonForm from '@/components/common/Form'
import { registerFormControls } from '@/components/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const AuthRegister = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, error} = useSelector((state) => state.auth);
  const [validationErrors, setValidationErrors] = useState({});

  const initailState = {
    username: '',
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(initailState)

   // Form validation logic
   const validateForm = () => {
    const errors = {};

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
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
  
  function onSubmit(event) {
    event.preventDefault();

    if (validateForm()) {
      dispatch(registerUser(formData))
        .unwrap() 
        .then(() => navigate('/auth/login'))
        .catch((err) => {
          console.log('Error during registration:', err);
        });
    }

  } 
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create new account</h1>
        <p className='mt-2'>Already have an account <Link className='font-medium text-primary ml-2 hover:underline' to="/auth/login">Login</Link></p>
      </div>
      <CommonForm formControls={registerFormControls} buttonText={isLoading ? 'Loading...' : 'Sign up'} formData={formData} setFormData={setFormData} onSubmit={onSubmit} validationErrors={validationErrors}/>
      {error && (
        <p className='mt-4 text-red-500 text-foreground font-sm text-center'>{error}</p>
      )}
    </div>
  )
}

export default AuthRegister
