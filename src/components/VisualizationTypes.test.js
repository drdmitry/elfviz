import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import VisualizationTypes from './VisualizationTypes';
import { visualizationTypes } from '../constants/visualizationTypes';

describe('VisualizationTypes', () => {
  it('renders without crashing', () => {
    shallow(<VisualizationTypes type={''} types={visualizationTypes} onChange={() => {}} />);
  });

  it('should match a snapshot', () => {
    const wrapper = shallow(<VisualizationTypes type={'Icicle'} types={visualizationTypes} onChange={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
