import api from './api.js';

export const uploadFile = async (file, onProgress) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        if (onProgress) onProgress(percentCompleted);
      }
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'File upload failed';
  }
};

export const getFiles = async () => {
  try {
    const response = await api.get('/files');
    return response.data.files;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to get files';
  }
};

export const geturl = async (key) => {
  try {
    const response = await api.get(`/file/view?key=${key}`);
    
    return response.data.url;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to get file URL';
  }
};


export const downloadFile = async (key) => {
  try {
    const response = await api.get(`/file?key=${key}`, {
      responseType: 'blob'
    });
    
    return response;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to download file';
  }
};

export const deleteFile = async (key) => {
  try {
    const response = await api.delete(`/file?key=${key}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || 'Failed to delete file';
  }
};