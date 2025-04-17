import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/UI/Card';
import Loader from '../components/UI/Loader';
import FileUploader from '../components/FileManagement/FileUploader';
import FilesList from '../components/FileManagement/FilesList';
import FileViewer from '../components/FileManagement/FileViewer';
import { getFiles } from '../services/fileService';

const FilesPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  useEffect(() => {
    const viewFileKey = searchParams.get('view');
    
    if (viewFileKey) {
      const fetchFile = async () => {
        try {
          setLoading(true);
          const files = await getFiles();
          const file = files.find(f => f.key === viewFileKey);
          setCurrentFile(file || null);
        } catch (error) {
          console.error('Error fetching file:', error);
          setCurrentFile(null);
        } finally {
          setLoading(false);
        }
      };
      
      fetchFile();
    } else {
      setCurrentFile(null);
    }
  }, [searchParams]);
  
  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  const closeFileViewer = () => {
    setSearchParams({});
    setCurrentFile(null);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Files</h1>
        <p className="text-gray-600">Upload, view and manage your files</p>
      </div>
      
      {currentFile ? (
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">File Viewer</h2>
            <button
              onClick={closeFileViewer}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Back to Files
            </button>
          </div>
          
          {loading ? (
            <Loader className="py-10" />
          ) : (
            <FileViewer file={currentFile} />
          )}
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <h2 className="text-lg font-medium mb-4">Upload Files</h2>
            <FileUploader onUploadSuccess={handleUploadSuccess} />
          </Card>
          
          <Card>
            <h2 className="text-lg font-medium mb-4">Your Files</h2>
            <FilesList refreshTrigger={refreshKey} />
          </Card>
        </>
      )}
    </div>
  );
};

export default FilesPage;
