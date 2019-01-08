import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import PropTypes from 'prop-types'
import Map from './Map'
import Sidebar from './Sidebar'
import * as FoursquareAPI from './FoursquareAPI'

class App extends Component {

    state = {
        venues: []
    }

    componentDidMount() {
        FoursquareAPI
            .getAll()
            .then((venues) => {
                this.setState({venues});
            })
    }


    render() {
        return (
            <Container fluid={true} className="h-100">
                <Row className="h-100">
                    <Col xs="12" md="4">
                        <Sidebar venues={this.state.venues}/>
                    </Col>
                    <Col xs="12" md="8">
                        <Map venues={this.state.venues}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
