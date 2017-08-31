import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import VisualizationType from './VisualizationType';

const typeObject = {
  name: 'Icicle',
  icon: 'icon',
};

describe('VisualizationType', () => {
  it('renders without crashing', () => {
    shallow(<VisualizationType type={''} typeObject={{}} onChange={() => {}} />);
  });

  it('should match an empty snapshot', () => {
    const wrapper = shallow(<VisualizationType type={''} typeObject={{}} onChange={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match a snapshot with type info', () => {
    const wrapper = shallow(<VisualizationType type={'Icicle'} typeObject={typeObject} onChange={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger onChange when clicked on a element', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<VisualizationType type={'Icicle2'} typeObject={typeObject} onChange={onChange} />);
    wrapper.find('a').simulate('click');
    expect(onChange).toHaveBeenCalledWith('Icicle');
  });

});
