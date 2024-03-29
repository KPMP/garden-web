import './App.css';
import React, {Component} from 'react';
import Plot from 'react-plotly.js';
import rawData from './tsneData.tsv';
import Papa from 'papaparse';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { plotData: [] }
  }

  componentWillMount() {
    Papa.parse(rawData, {
      download: true,
      header: true,
      delimiter: '\t',
      complete: (results) => { this.setData(results)}
    });
  }

  setData = ( results ) => {
    let xaxis = [];
    let yaxis = [];
    let cluster = [];
    results.data.map(function(line) {
      xaxis.push(line.tSNE_1);
      yaxis.push(line.tSNE_2);
      cluster.push(line.cluster)
    });
    let data = [{
      type: 'scatter',
      mode: 'markers',
      x: xaxis,
      y: yaxis,
      color: cluster,
      marker: { coloer: 'red'}
    }];
    this.setState({plotData: data});
  }

  tran

  render() {
    return (
      <Plot data={this.state.plotData} />
    )
  }
}



export default App;
