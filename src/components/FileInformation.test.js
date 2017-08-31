import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FileInformation from './FileInformation';

describe('FileInformation', () => {
  it('renders without crashing', () => {
    shallow(<FileInformation />);
  });

  it('should match an empty snapshot', () => {
    const wrapper = shallow(<FileInformation />);
    expect(toJson(wrapper)).toBeNull();
  });

  it('should match a snapshot with file info', () => {
    const wrapper = shallow(<FileInformation file={{ name: 'test file', size: 12345 }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
