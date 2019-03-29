import React, { Component } from 'react';
import NavBar from './components/Nav/NavBar';
import loadedState from './initialState';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { Provider } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import { Router } from 'react-router-dom';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';
import Papa from 'papaparse';

const cacheStore = window.sessionStorage.getItem('redux-store');
const initialState = cacheStore ? JSON.parse(cacheStore) : loadedState;
const store = applyMiddleware(thunk)(createStore)(
  appReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const saveState = () => {
  window.sessionStorage.setItem(
    'redux-store',
    JSON.stringify(store.getState())
  );
};

// *** Get a new tracking Id and add it here *** //
const GA_TRACKING_ID = '';

ReactGA.initialize(GA_TRACKING_ID);
function logPageView(location, action) {
  ReactGA.set({ page: location.pathname + location.search });
  ReactGA.pageview(location.pathname + location.search);
}
const history = createHistory();
history.listen((location, action) => {
  logPageView(location, action);
});

store.subscribe(function() {
  console.log(store.getState());
});

store.subscribe(saveState);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { violinData: [], scatterData: []};
  }

  unpack = (rows, key) => {
    return rows.map(function(row) { return row[key]; });
  }

  setViolinData = (results) => {
    let rawData = results.data;
    var violinData = [{
      type: 'violin',
      x: this.unpack(rawData, 'day'),
      y: this.unpack(rawData, 'total_bill'),
      points: 'none',
      box: {
        visible: true
      },
      line: {
        color: 'green',
      },
      meanline: {
        visible: true
      },
      transforms: [{
        type: 'groupby',
        groups: this.unpack(rawData, 'day'),
        styles: [
          {target: 'Sun', value: {line: {color: 'blue'}}},
          {target: 'Sat', value: {line: {color: 'orange'}}},
          {target: 'Thur', value: {line: {color: 'green'}}},
          {target: 'Fri', value: {line: {color: 'red'}}}
        ]
      }]
    }];
    this.setState({violinData: violinData})
  }

  setScatterData = () => {
    let x1 = [];
    let y1 = [];
    let x2 = [];
    let y2 = [];

    for (var i = 0; i < 100; i++) {
      x1.push(Math.floor(Math.random() * 50));
      y1.push(Math.floor(Math.random() * 50));
      x2.push(Math.floor(Math.random() * 50) + 50);
      y2.push(Math.floor(Math.random() * 50) + 50);
    }

    let cell1 = {
      x: x1,
      y: y1,
      mode: 'markers',
      type: 'scatter',
      name: 'Epithelial',
      marker: { size: 12 }
    };

    let cell2 = {
      x: x2,
      y: y2,
      mode: 'markers',
      type: 'scatter',
      name: 'Podocyte',
      marker: { size: 12 }
    };

    let scatterData = [ cell1, cell2 ];

    this.setState({scatterData: scatterData})
  }


  componentWillMount() {
    logPageView(window.location, '');
    Papa.parse("https://raw.githubusercontent.com/plotly/datasets/master/violin_data.csv", {
      download: true,
      header: true,
      complete: (results) => {this.setViolinData(results)}
    });
    this.setScatterData();
  }


  render() {
    let violinLayout = {
      title: "Multiple Traces Violin Plot",
      yaxis: {
        zeroline: false
      }
    }

    let scatterLayout = {};

      return (
      <Provider store={store}>
        <Router history={history}>
          <Container fluid>
            <NavBar />
            <div id="main-page">
              <Plot
                  data={this.state.violinData}
                  layout={violinLayout}
                  />
              <Plot
                  data={this.state.scatterData}
                  layout={scatterLayout}
              />
            </div>
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
