import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ChartTooltip from './ChartTooltip';

const data = {
  key: 'key', value: 'value',
}

describe('ChartTooltip', () => {
  it('renders without crashing', () => {
    shallow(<ChartTooltip data={data} />);
  });

  it('should match an empty snapshot', () => {
    const wrapper = shallow(<ChartTooltip data={data} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match snapshot with provided data', () => {
    const wrapper = shallow(<ChartTooltip
      data={data}
      pos={{ x: 100, y: 20 }}
      textStyle1="style1"
      textStyle2="style2"
      bgStyle="tooltip-bg"
      xValue="xValue"
      yValue="yValue"
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match snapshot with provided data and visible', () => {
    const wrapper = shallow(<ChartTooltip
      display
      data={data}
      pos={{ x: 100, y: 20 }}
      textStyle1="style1"
      textStyle2="style2"
      bgStyle="tooltip-bg"
      xValue="xValue"
      yValue="yValue"
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match snapshot with provided data and visible when y > height', () => {
    const wrapper = shallow(<ChartTooltip
      display
      data={data}
      pos={{ x: 100, y: 200 }}
      textStyle1="style1"
      textStyle2="style2"
      bgStyle="tooltip-bg"
      xValue="xValue"
      yValue="yValue"
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
