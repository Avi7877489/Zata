import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, oauthLogin } = useAuth();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        await login(values.email, values.password);
        toast.success('Login successful!');
        navigate('/app/dashboard');
      } catch (error) {
        toast.error(error || 'Login failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  });
  
  const handleOAuthLogin = (provider) => {
    oauthLogin(provider);
  };
  
  return (
    <div className="max-w-md w-full space-y-8">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
      
      <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
        <div className="rounded-md shadow-sm space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input mt-1"
              placeholder="Email address"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input mt-1"
              placeholder="Password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-600">{formik.errors.password}</p>
            )}
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full flex justify-center"
          >
            {isSubmitting ? (
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            ) : (
              'Sign in'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span className="sr-only">Sign in with Google</span>
            <FaGoogle className="h-5 w-5 text-red-500" />
          </button>
          
          <button
            type="button"
            onClick={() => handleOAuthLogin('github')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <span className="sr-only">Sign in with GitHub</span>
            <FaGithub className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;