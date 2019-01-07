import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types'
import Map from './Map'



Container.propTypes = {
    fluid:  PropTypes.bool
    // applies .container-fluid class
  }

class App extends Component {

  render() {
    return (
        <Container fluid={true} className="h-100">
            <Row className="h-100">
                <Col xs="12" sm="2">.col-6 .col-sm-4</Col>
                <Col xs="12" sm="10">
                    <Map/>
                </Col>
            </Row>
      </Container>
    );
  }
}

export default App;
