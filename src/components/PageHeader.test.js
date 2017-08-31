import React from 'react';
import { shallow } from 'enzyme';
import PageHeader from './PageHeader';

const VERSION = require("../../package.json").jest.globals.VERSION;

describe('PageHeader', () => {
  it('renders without crashing', () => {
    shallow(<PageHeader />);
  });

  it('PageHeader renders as h1', () => {
    const wrapper = shallow(<PageHeader />);
    expect(wrapper.type()).toEqual('h1');
  });

  it('PageHeader contains version number in small tag', () => {
    const wrapper = shallow(<PageHeader />);
    expect(wrapper.find('small').text()).toEqual('v' + VERSION);
  });

});
