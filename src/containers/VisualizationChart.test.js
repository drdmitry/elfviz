import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import VisualizationChart from './VisualizationChart';

describe('VisualizationChart', () => {
  it('renders without crashing', () => {
    shallow(<VisualizationChart type={''} data={null} />);
  });

  it('should match an empty snapshot', () => {
    const wrapper = shallow(<VisualizationChart type={'Icicle'} data={null} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match a generic snapshot', () => {
    const wrapper = shallow(<VisualizationChart type={'Icicle'} data={[]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
