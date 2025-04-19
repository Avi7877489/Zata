import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { uploadFile } from '../../services/fileService';
import Button from '../UI/Button';

const FileUploader = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    
    try {
      setUploading(true);
      setUploadProgress(0);
      
      for (const file of acceptedFiles) {
        await uploadFile(file, (progress) => {
          setUploadProgress(progress);
        });
      }
      
      toast.success(
        acceptedFiles.length === 1
          ? 'File uploaded successfully!'
          : `${acceptedFiles.length} files uploaded successfully!`
      );
      
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      toast.error(error || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [onUploadSuccess]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: uploading
  });
  
  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        } ${uploading ? 'opacity-75 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        <FaCloudUploadAlt className="text-blue-500 h-12 w-12 mb-3" />
        <p className="text-gray-700 text-center mb-2">
          {isDragActive ? 'Drop files here' : 'Drag and drop files here, or click to select files'}
        </p>
        <p className="text-gray-500 text-sm text-center">Upload any file type. Max size: 2GB</p>
        
        {uploading && (
          <div className="mt-4 w-full max-w-xs">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1 text-center">{uploadProgress}% uploaded</p>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <Button
          type="button"
          variant="primary"
          fullWidth
          isLoading={uploading}
          {...getRootProps()}
        >
          {uploading ? 'Uploading...' : 'Upload Files'}
        </Button>
      </div>
    </div>
  );
};

export default FileUploader;
