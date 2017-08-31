import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import VisualizationType from './VisualizationType';

const VisualizationTypes = ({ type, types, onChange }) => {
  return (
    <ul className="nav nav-pills">
      {types.map(typeObject => (
        <VisualizationType
          key={'type-' + typeObject.name}
          type={type}
          typeObject={typeObject}
          onChange={onChange.bind(this)}
        />
      ))}
    </ul>
  );
};

VisualizationTypes.propTypes = {
  type: PropTypes.string.isRequired,
  types: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default VisualizationTypes;
