import React from 'react';

const FileInformation = ({ file }) => {
  return file ? <h5>{file.name} {file.size} bytes</h5> : null;
};

export default FileInformation;
