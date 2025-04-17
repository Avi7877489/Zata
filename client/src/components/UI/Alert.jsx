import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';

const Alert = ({ type = 'info', children, className = '', ...props }) => {
  const typeClasses = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };
  
  const Icon = {
    success: FaCheckCircle,
    error: FaExclamationCircle,
    warning: FaExclamationTriangle,
    info: FaInfoCircle
  }[type];
  
  return (
    <div className={`flex items-center p-4 rounded-md border ${typeClasses[type]} ${className}`} {...props}>
      <Icon className="h-5 w-5 mr-3" />
      <div>{children}</div>
    </div>
  );
};

export default Alert;