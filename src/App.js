import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import PropTypes from 'prop-types'
import Map from './Map'
import Sidebar from './Sidebar'

class App extends Component {

    state = {
        places: [
            {
                name: "a",
                lat: -30.0862632,
                lng: -51.2464813
            },
            {
                name: "b",
                lat: -30.0776091,
                lng: -51.2452313
            },
            {
                name: "c",
                lat: -30.0963509,
                lng: -51.2495839
            },
            {
                name: "d",
                lat: -30.0790678,
                lng: -51.2472779
            },
            {
                name: "e",
                lat: -30.0684614,
                lng: -51.2401901
            }
        ]
    }


    render() {
        return (
            <Container fluid={true} className="h-100">
                <Row className="h-100">
                    <Col xs="12" md="4">
                        <Sidebar places={this.state.places}/>
                    </Col>
                    <Col xs="12" md="8">
                        <Map places={this.state.places}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
