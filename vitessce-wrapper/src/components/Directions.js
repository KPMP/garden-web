import React, { Component } from 'react';
import { Vitessce } from 'vitessce';
import myViewConfig from './viewConfig.json';
import 'vitessce/dist/es/production/static/css/index.css';

class Directions extends Component {
  render() {

    return (
        <Vitessce
            config={myViewConfig}
            height={800}
            theme="light" />
    );
  }
}

export default Directions;
