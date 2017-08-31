import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FileButtonList from './FileButtonList';

const files = {
  file1: {
    name: 'name1',
  },
  file2: {
    name: 'name2',
  },
}

describe('FileButtonList', () => {
  it('renders without crashing', () => {
    shallow(<FileButtonList files={{}} onClick={() => {}} />);
  });

  it('should render as span element', () => {
    const wrapper = shallow(<FileButtonList files={{}} onClick={() => {}} />);
    expect(wrapper.type()).toEqual('span');
  });

  it('should match an empty snapshot', () => {
    const wrapper = shallow(<FileButtonList files={{}} onClick={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match snapshot with files', () => {
    const wrapper = shallow(<FileButtonList files={files} onClick={() => {}} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
