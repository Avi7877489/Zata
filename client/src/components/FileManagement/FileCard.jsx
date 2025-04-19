import React, { useState } from 'react';
import { FaDownload, FaTrash, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { downloadFile, deleteFile,geturl } from '../../services/fileService';
import { formatBytes } from '../../utils/formatBytes';
import { formatDate } from '../../utils/formatDate';
import { getFileIcon } from '../../utils/fileTypeIcons';
import Button from '../UI/Button';
import Card from '../UI/Card';

const FileCard = ({ file, onDeleteSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const FileIcon = getFileIcon(file.mimetype);
  
  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      const response = await downloadFile(file.s3Key);
      
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error('Failed to download file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        setIsDeleting(true);
        await deleteFile(file.s3Key);
        onDeleteSuccess(file.s3Key);
      } catch (error) {
        toast.error('Failed to delete file. Please try again.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  const handleViewFile = async() => {
    // Implementation depends on file type

    const url = await geturl(file.s3Key);
    if (file) {
      window.open(url, '_blank');
    } else {
      toast.info('This file type cannot be previewed. Please download it instead.');
    }
  };
  
  return (
    <Card className="flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 flex items-center justify-center bg-gray-100 rounded-lg">
          <FileIcon className="h-6 w-6 text-gray-500" />
        </div>
        <div className="ml-4 flex-1 min-w-0">
          <h3 className="text-lg font-medium text-gray-900 truncate" title={file.fileName}>
            {file.fileName}
          </h3>
          <p className="text-sm text-gray-500">{formatBytes(file.fileSize)}</p>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mb-4">
        <p>Uploaded on {formatDate(file.createdAt)}</p>
      </div>
      
      <div className="flex space-x-2 mt-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewFile}
          className="flex-1"
        >
          <FaEye className="mr-1" /> View
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          isLoading={isDownloading}
          className="flex-1"
        >
          <FaDownload className="mr-1" /> Download
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          isLoading={isDeleting}
        >
          <FaTrash />
        </Button>
      </div>
    </Card>
  );
};

export default FileCard;