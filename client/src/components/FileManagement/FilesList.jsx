import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getFiles } from '../../services/fileService';
import FileCard from './FileCard';
import Loader from '../UI/Loader';
import Alert from '../UI/Alert';

const FilesList = ({ refreshTrigger }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedFiles = await getFiles();
        setFiles(fetchedFiles);
      } catch (err) {
        setError(err || 'Failed to load files');
        toast.error('Failed to load files. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFiles();
  }, [refreshTrigger]);
  
  const handleDeleteSuccess = (deletedFileKey) => {
    setFiles(files.filter(file => file.s3Key !== deletedFileKey));
    toast.success('File deleted successfully!');
  };
  
  if (loading) {
    return <Loader className="py-10" />;
  }
  
  if (error) {
    return <Alert type="error">{error}</Alert>;
  }
  
  if (files.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No files found. Upload some files to get started!</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {files.map((file) => (
        <FileCard
          key={file.s3Key}
          file={file}
          onDeleteSuccess={handleDeleteSuccess}
        />
      ))}
    </div>
  );
};

export default FilesList;
