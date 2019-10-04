import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import TSnePlotWidget from 'ebi-scea-tsne-widget'

class Directions extends Component {
  render() {
    return (
            <TSnePlotWidget
              experimentAccession={`E-ENAD-15`}
              geneId={`ENSMUSG00000041147`}
            />

    );
  }
}

export default Directions;
