import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChartTooltip extends Component {
  render() {
    let visibility = 'hidden';
    let transform = '';
    let width = 200;
    let height = 54;
    let transformText = 'translate(' + width / 2 + ',' + (height / 2 - 10) + ')';
    let transformArrow = '';

    if (this.props.display) {
      const { x, y } = this.props.pos;
      visibility = 'visible';

      if (y > height) {
        transform = 'translate(' + (x - width / 2) + ',' + (y - height - 20) + ')';
        transformArrow = 'translate(' + (width / 2 - 20) + ',' + (height - .2) + ')';
      } else if (y < height) {
        transform = 'translate(' + (x - width / 2) + ',' + (Math.round(y) + 20) + ')';
        transformArrow = 'translate(' + (width / 2 - 20) + ',' + 0 + ') rotate(180,20,0)';
      }
    }

    const text1 = this.props.xValue + ': ' + this.props.data.key;
    const text2 = this.props.yValue + ': ' + this.props.data.value;
    return (
      <g transform={transform}>
        <rect class={this.props.bgStyle} is width={width} height={height} rx="5" ry="5" visibility={visibility} />
        <polygon class={this.props.bgStyle} is points="10,0  30,0  20,10" transform={transformArrow} visibility={visibility} />
        <text is visibility={visibility} transform={transformText}>
          <tspan is x="0" class={this.props.textStyle1} text-anchor="middle">{text1}</tspan>
          <tspan is x="0" class={this.props.textStyle2} text-anchor="middle" dy="25">{text2}</tspan>
        </text>
      </g>
    );
  }
}

ChartTooltip.propTypes = {
  data: PropTypes.object.isRequired,
  pos: PropTypes.object,
  tooltip: PropTypes.object,
  bgStyle: PropTypes.string,
  textStyle1: PropTypes.string,
  textStyle2: PropTypes.string,
  xValue: PropTypes.string,
  yValue: PropTypes.string,
};

export default ChartTooltip;
