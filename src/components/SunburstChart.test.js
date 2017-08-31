import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SunburstChart from './SunburstChart';

import * as config from '../constants/config';
import elfSimpleCProgram from '../data/elfSimpleCProgram';
import { convertReadElfToD3 } from '../lib/converter';

describe('SunburstChart', () => {
  it('renders without crashing', () => {
    shallow(<SunburstChart id="id" data={[]} height={0} width={0} />);
  });

  it('should match an empty snapshot', () => {
    const wrapper = shallow(<SunburstChart id="id" data={[]} height={0} width={0} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match a full data snapshot', () => {
    const data = convertReadElfToD3(elfSimpleCProgram);
    const wrapper = shallow(<SunburstChart id="id" data={data} height={config.height} width={500} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
