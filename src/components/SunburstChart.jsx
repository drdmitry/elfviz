import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { arc } from 'd3-shape';
import { hierarchy, partition } from 'd3-hierarchy';
import { scaleLinear, scaleOrdinal, schemeCategory20 } from 'd3-scale';

import ChartTooltip from './ChartTooltip';

class SunburstChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tooltip: {
        display: false,
      },
    };

    this.color = scaleOrdinal(schemeCategory20);
    this.scaleX = scaleLinear().domain([0, 360]).range([0, 2 * Math.PI]);
  };

  showTooltip(tooltip = { display: false }, event) {
    this.setState({ tooltip });
  }

  renderPartition() {
    const { width, height, data } = this.props;
    const rootData = {
      name: 'ELF',
      children: data,
    };
    const radius = Math.min(width, height) / 2;

    const root = hierarchy(rootData, d => d.children)
      .sum(d => d.size);

    const sunburstPartition = partition()
      .size([360, radius])
      .padding(0);

    const nodes = sunburstPartition(root)
      .descendants();

    const arcFunction = arc()
      .startAngle(d => this.scaleX(d.x0))
      .endAngle(d => this.scaleX(d.x1))
      // .padAngle(padAngle)
      // .padRadius(radius / 3)
      .innerRadius(d => d.y0)
      .outerRadius(d => d.y1);

    const path = nodes.map((d, i) => {
      const style = {
        fill: this.color(i),
        stroke: '#fff',
      };
      const textX = width / 2;
      const textY = height / 2;
      const tooltipObject = {
        data: {
          key: d.data.name,
          value: d.data.size,
        },
        display: true,
        pos: {
          x: textX,
          y: textY,
        },
      };
      return (
        <path
          key={'path' + i}
          className="path"
          style={style}
          fillRule="evenodd"
          display={d.depth ? null : 'none'}
          d={arcFunction(d)}
          onMouseOver={this.showTooltip.bind(this, tooltipObject)}
          onMouseOut={this.showTooltip.bind(this)}
        />
      );
    });
    return path;
  }
  
  render() {
    const { data, width, height } = this.props;
    const { tooltip } = this.state;
    const partition = this.renderPartition();
    const transform = 'translate(' + width / 2 + ',' + height / 2 + ')';
    return (
      <svg
        id={this.props.id}
        width={width}
        height={height}
      >
        <g transform={transform}>
          {partition}
        </g>
        {tooltip.display ? <ChartTooltip
          textStyle1="tooltip-text1"
          textStyle2="tooltip-text1"
          bgStyle="tooltip-bg"
          xValue="Section"
          yValue="Size"
          {...tooltip}
        /> : null}
      </svg>
    );
  }
}

SunburstChart.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

SunburstChart.defaultProps = {
  data: [],
  height: 0,
  width: 0,
};

export default SunburstChart;
