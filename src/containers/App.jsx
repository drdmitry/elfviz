import React, { Component } from 'react';
import * as FileSaver from 'file-saver';

import files from '../constants/sampleFiles';
import { visualizationTypes } from '../constants/visualizationTypes';
import { qrcode } from '../constants/config';

import PageHeader from '../components/PageHeader';
import FileButtonList from '../components/FileButtonList';
import FileInformation from '../components/FileInformation';
import VisualizationTypes from '../components/VisualizationTypes';

import VisualizationChart from './VisualizationChart';

import { readfile } from '../lib/readfile';
import { convertReadElfToD3 } from '../lib/converter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: visualizationTypes[0].name,
      data: null,
      showQR: false,
    };
  }

  onChangeVisualizationType(type, event) {
    this.setState({ type });
    event.preventDefault();
  }

  onChangeFile(event) {
    const files = event.target.files;
    // console.log('files', files);
    if (files.length > 0) {
      readfile(files[0])
        .then(content => JSON.parse(content))
        .then(content => convertReadElfToD3(content))
        .then(data => {
          const file = {
            name: files[0].name,
            size: files[0].size,
          };
          // console.log('obj', file);
          this.setState({ data, file });
        })
        .catch(err => {
          console.log('Error loading file', err);
        });
    }
  }

  onClickDownloadSample(name, jsonData) {
    // console.log('data', name, jsonData);
    const data = JSON.stringify(jsonData, null, 2);
    FileSaver.saveAs(new Blob([data], { type: 'application/json' }), name + '.json');
  }

  showQRCode(visible, event) {
    this.setState({ showQR: visible });
  }

  render() {
    const { type, file, data } = this.state;
    // console.log('files', files);
    return (
      <div className="container-fluid">
        <div className="page-header"><PageHeader /></div>
        <div className="row">
          <div className="col-md-4">
            <h4><span className="badge text-primary">1</span> Upload file in JSON format:</h4>
            <input className="btn" type="file" onChange={this.onChangeFile.bind(this)} />
            <small>Download sample JSONs: <FileButtonList files={files} onClick={this.onClickDownloadSample.bind(this)} /></small>
          </div>

          <div className="col-md-4">
            {file ? <h4>File Information</h4> : null}
            <FileInformation file={file} />
            <br/>
          </div>

          <div className="col-md-4">
            <h4><span className="badge label-primary">2</span> Choose Visualization Type:</h4>
            <VisualizationTypes
              type={type}
              types={visualizationTypes}
              onChange={this.onChangeVisualizationType.bind(this)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr />
            <VisualizationChart type={type} data={data} />
          </div>
        </div>
        <br />
        <footer className="footer">
          <hr />
          <span className="pointer pull-right" onMouseOver={this.showQRCode.bind(this, true)} onMouseOut={this.showQRCode.bind(this, false)}>Mobile?</span>
          <p>2017 Dmitry Fedotov</p>
        </footer>
        {this.state.showQR ? <img className="qrcode" src={qrcode} /> : null}
      </div>
    );
  }
};

export default App;
