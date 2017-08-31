import React from 'react';
import PropTypes from 'prop-types';

const FileButtonList = ({ files, onClick }) => {
  const filenames = Object.keys(files);
  const links = filenames.map((filename, index) => (
    <a
      href="#"
      key={'file-' + filename}
      className="btn btn-xs btn-default"
      onClick={onClick.bind(this, filename, files[filename])}
      title={filename + '.json'}
    >
      {index + 1}
    </a>
  ));
  return <span>{links}</span>;
};

FileButtonList.propTypes = {
  files: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FileButtonList;
