import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const VisualizationType = ({ type, typeObject, onChange }) => {
  const { name, icon } = typeObject;
  const className = cx({ active: type === name });
  return (
    <li role="presentation" className={className}>
      <a href="#" onClick={onChange.bind(this, name)}>{icon} {name}</a>
    </li>
  );
};

VisualizationType.propTypes = {
  type: PropTypes.string.isRequired,
  typeObject: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default VisualizationType;
