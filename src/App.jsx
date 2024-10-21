import React, { useState } from 'react';
import axios from 'axios';
import MultiFileUpload from './Components/MultiFileUpload/MultiFileUpload';

export default function App() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const uploadFiles = async () => {
    setUploading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post('https://your-api.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response) {
        alert('Files uploaded successfully!');
      }
    } catch (error) {
      alert('Error uploading files');
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <MultiFileUpload 
      files={files} 
      setFiles={setFiles} 
      uploadFiles={uploadFiles} 
      uploading={uploading} 
      removeFile={removeFile} 
    />
  );
}
