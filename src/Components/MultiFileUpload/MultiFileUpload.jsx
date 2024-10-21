import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from "react-icons/fa";
import styles from './MultiFileUpload.module.css';

const MultiFileUpload = () => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setFiles([...files, ...acceptedFiles]),
    multiple: true,
    accept: 'image/*',
  });

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
    <div className={styles.uploadContainer}>
      <div className={styles.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <FaCloudUploadAlt size={150} color='#007bff' />
        <p>Drag & drop files here, or click to select files</p>
      </div>

      <div className={styles.fileList}>
        {files.length > 0 &&
          files.map((file) => (
            <div key={file.name} className={styles.fileItem}>
              <span>{file.name}</span>
              <button className={styles.removeBtn} onClick={() => removeFile(file.name)}>Remove</button>
            </div>
          ))}
      </div>

      {files.length > 0 && (
        <button onClick={uploadFiles} disabled={uploading} className={styles.uploadBtn}>
          {uploading ? 'Uploading...' : 'Upload Files'}
        </button>
      )}
    </div>
  );
};

export default MultiFileUpload;
