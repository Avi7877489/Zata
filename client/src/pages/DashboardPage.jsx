import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaCloudUploadAlt, FaChartBar } from 'react-icons/fa';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Loader from '../components/UI/Loader';
import { getFiles } from '../services/fileService';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { formatBytes } from '../utils/formatBytes';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalSize: 0,
    recentFiles: []
  });
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const files = await getFiles();
        
        const totalSize = files.reduce((acc, file) => acc + file.fileSize, 0);
        const recentFiles = files.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        
        setStats({
          totalFiles: files.length,
          totalSize,
          recentFiles
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) {
    return <Loader className="py-10" />;
  }
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {currentUser.name}!</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <FaFileAlt className="h-6 w-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Files</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalFiles}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <FaChartBar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Storage Used</p>
            <h3 className="text-2xl font-bold text-gray-900">{formatBytes(stats.totalSize)}</h3>
          </div>
        </Card>
        
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <FaCloudUploadAlt className="h-6 w-6" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Upload Limit</p>
            <h3 className="text-2xl font-bold text-gray-900">2GB / file</h3>
          </div>
        </Card>
      </div>
      
      {/* Recent Files */}
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Files</h2>
          <Link to="/app/files">
            <Button variant="outline" size="sm">View All Files</Button>
          </Link>
        </div>
        
        {stats.recentFiles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentFiles.map((file) => (
                  <tr key={file.key}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaFileAlt className="flex-shrink-0 h-5 w-5 text-gray-400" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{file.fileName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatBytes(file.fileSize)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(file.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/app/files?view=${file.key}`} className="text-blue-600 hover:text-blue-900">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">No files uploaded yet</p>
            <Link to="/app/files" className="mt-2 inline-block">
              <Button variant="primary" size="sm">Upload your first file</Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;