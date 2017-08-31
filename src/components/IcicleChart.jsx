import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { hierarchy, partition } from 'd3-hierarchy';
import { scaleLinear, scaleOrdinal, schemeCategory20 } from 'd3-scale';

import ChartTooltip from './ChartTooltip';

class IcicleChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tooltip: {
        display: false,
      },
    };

    this.color = scaleOrdinal(schemeCategory20);
    this.initializeScale(props);
  };

  componentWillReceiveProps(props) {
    this.initializeScale(props);
  }

  initializeScale(props) {
    const { width, height } = props;

    this.scaleX = scaleLinear().domain([0, width]).range([0, width]);
    this.scaleY = scaleLinear().domain([0, height]).range([0, height]);
  }

  showTooltip(tooltip = { display: false }, event) {
    this.setState({ tooltip });
  }

  onClickRect(d, event) {
    const { width, height } = this.props;

    this.scaleX.domain([d.x0 + 1, d.x1 - 1]);
    this.scaleY.domain([d.y0 - 1, height]).range([d.y0 > 1 ? 20 : 0, height]);

    this.forceUpdate(); // to trigger re-rendering, normally forceUpdate() should be avoided in the app
  }

  renderPartition() {
    const { data } = this.props;
    const rootData = {
      name: 'ELF',
      size: 0,
      children: data,
    };

    const root = hierarchy(rootData)
      .sum(d => d.size);

    const iciclePartition = partition()
      .size([this.props.width, this.props.height])
      .padding(1);

    const nodes = iciclePartition(root)
      .descendants();

    const rects = nodes.map((d, i) => {
      const rectStyle = {
        fill: this.color(i),
      };
      const x = this.scaleX(d.x0);
      const y = this.scaleY(d.y0);
      const width = this.scaleX(d.x1) - x;
      const height = this.scaleY(d.y1) - y;
      const textX = x + width / 2;
      const textY = y + height / 2;
      const transform = 'translate(' + textX + ',' + textY + ')rotate(90)';
      const tooltipObject = { // assigning object not very optimal, to be rewrited later
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
        <g key={'path' + i}>
          <rect
            className="node"
            x={x}
            y={y}
            width={width}
            height={height}
            style={rectStyle}
            onClick={this.onClickRect.bind(this, d)}
            onMouseOver={this.showTooltip.bind(this, tooltipObject)}
            onMouseOut={this.showTooltip.bind(this)}
          />
          {width > 6 ? <text className="label" dx="0.35em" transform={transform}>{d.data.name}</text> : null}
        </g>
      );
    });
    return rects;
  }
  
  render() {
    const { id, width, height } = this.props;
    const { tooltip } = this.state;
    const partition = this.renderPartition();
    return (
      <svg id={id} width={width} height={height}>
        {partition}
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

IcicleChart.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

IcicleChart.defaultProps = {
  data: [],
  height: 0,
  width: 0,
};

export default IcicleChart;
