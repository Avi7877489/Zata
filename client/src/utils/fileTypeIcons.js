import { 
    FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, 
    FaFileImage, FaFileAudio, FaFileVideo, FaFileAlt, 
    FaFileArchive, FaFileCode, FaFile 
  } from 'react-icons/fa';
  
  export const getFileIcon = (mimeType) => {
    if (!mimeType) return FaFile;
    
    if (mimeType.includes('pdf')) return FaFilePdf;
    if (mimeType.includes('word') || mimeType.includes('docx') || mimeType.includes('doc')) return FaFileWord;
    if (mimeType.includes('excel') || mimeType.includes('sheet') || mimeType.includes('xls')) return FaFileExcel;
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint') || mimeType.includes('ppt')) return FaFilePowerpoint;
    if (mimeType.includes('image')) return FaFileImage;
    if (mimeType.includes('audio')) return FaFileAudio;
    if (mimeType.includes('video')) return FaFileVideo;
    if (mimeType.includes('text')) return FaFileAlt;
    if (mimeType.includes('zip') || mimeType.includes('compressed') || mimeType.includes('tar') || mimeType.includes('rar')) return FaFileArchive;
    if (mimeType.includes('javascript') || mimeType.includes('json') || mimeType.includes('html') || mimeType.includes('css')) return FaFileCode;
    
    return FaFile;
  };