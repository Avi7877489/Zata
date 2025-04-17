import React from 'react';
import { FaFilePdf, FaFileImage, FaFile } from 'react-icons/fa';

const FileViewer = ({ file }) => {
  if (!file) return null;
  
  const renderPreview = () => {
    if (file.mimetype.includes('image')) {
      return (
        <div className="flex justify-center">
          <img 
            src={file.url} 
            alt={file.name} 
            className="max-w-full max-h-[500px] object-contain" 
          />
        </div>
      );
    } else if (file.mimetype === 'application/pdf') {
      return (
        <div className="w-full h-[600px]">
          <object
            data={file.url}
            type="application/pdf"
            width="100%"
            height="100%"
            className="border"
          >
            <div className="flex flex-col items-center justify-center h-full bg-gray-100 border rounded-md p-6">
              <FaFilePdf className="text-red-500 h-12 w-12 mb-4" />
              <p className="text-gray-700">
                This browser does not support embedded PDFs.
                <a 
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Download instead
                </a>
              </p>
            </div>
          </object>
        </div>
      );
    } else if (file.mimetype.startsWith('text/')) {
      return (
        <div className="border rounded-md p-4 bg-gray-50 font-mono text-sm overflow-auto max-h-[500px]">
          <pre>{file.content || 'Text preview not available'}</pre>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 border rounded-md p-6">
          <FaFile className="text-gray-500 h-12 w-12 mb-4" />
          <p className="text-gray-700">Preview not available for this file type</p>
        </div>
      );
    }
  };
  
  return (
    <div className="w-full">
      <div className="mb-4 pb-4 border-b">
        <h2 className="text-xl font-semibold">{file.name}</h2>
      </div>
      {renderPreview()}
    </div>
  );
};

export default FileViewer;