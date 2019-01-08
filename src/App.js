import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Row, Col, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import PropTypes from 'prop-types'
import Map from './Map'
import Sidebar from './Sidebar'
import * as FoursquareAPI from './FoursquareAPI'
import escapeRegExp from 'escape-string-regexp'

class App extends Component {

    state = {
        venues: [],
        visibleVenues: [],
        visibleMarkers: [],
        query: ''
    }

    componentDidMount() {
        FoursquareAPI
            .getAll()
            .then((venues) => {
                this.setState({
                    venues: venues,
                    visibleVenues: venues
                });
            })
    }

    updateQuery = (query) => {
        this.setState({query});
        const match = new RegExp(escapeRegExp(query), 'i');
        this.setState({visibleVenues: this.state.venues.filter(venue => match.test(venue.name))})
    }

    render() {
        return (
            <Container fluid={true} className="h-100">
                { this.state.venues &&
                <Row className="h-100">
                    <Col xs="12" md="4">
                        <Sidebar venues={this.state.visibleVenues} onSearch={this.updateQuery}/>
                    </Col>
                    <Col xs="12" md="8">
                        <Map venues={this.state.visibleVenues} query={this.state.query}/>
                    </Col>
                </Row>
                }

            </Container>
        );
    }
}

export default App;
