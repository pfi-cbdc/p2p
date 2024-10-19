// client/src/components/FileUpload.js
import React from 'react';

const FileUpload = ({ onFileSelect }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileSelect(file);
  };

  return (
    <div>
      <label htmlFor="fileUpload">Upload File:</label>
      <input type="file" id="fileUpload" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
