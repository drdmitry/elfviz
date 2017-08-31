import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Measure from 'react-measure';

import SunburstChart from '../components/SunburstChart';
import IcicleChart from '../components/IcicleChart';

import * as config from '../constants/config';

class VisualizationChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {
        width: 0,
        height: 0,
      },
    };
  }

  onResize(contentRect) {
    this.setState({ dimensions: contentRect.bounds });
  }

  render() {
    const { type, data } = this.props;
    const { width } = this.state.dimensions;
    const { height } = config;

    if (data === null) return <div className="text-center alert">No data loaded.</div>;

    return (
      <Measure bounds onResize={this.onResize.bind(this)}>
        {({ measureRef }) =>
          <div ref={measureRef}>
            <h2>Visualization <small>({type})</small></h2>
            {type === 'Icicles' ? <p>Click anywhere to zoom in, or click on the top bar to zoom out.</p> : null}
            {type === 'Icicles' ? <IcicleChart id="chart-icicle" width={width} height={height} data={data} /> : null}
            {type === 'Sunburst' ? <SunburstChart id="chart-sunburst" width={width} height={height} data={data} /> : null}
          </div>
        }
      </Measure>
    );
  }
};

VisualizationChart.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.array,
}

export default VisualizationChart;
