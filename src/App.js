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
        map: null,
        infoWindow: null,
        bounds: null,
        markers: []
    }

    componentDidMount() {
        FoursquareAPI
            .getAll()
            .then((venues) => {
                this.setState({
                    venues: venues,
                    visibleVenues: venues
                });
                console.log("venues loaded");
            })
    }

    setMap = (map) => {
        console.log("map created");
        this.setState({
            map: map,
            infoWindow: new window.google.maps.InfoWindow(),
            bounds: new window.google.maps.LatLngBounds()
        });
        const markers = this.createMarkers(map);
        this.setState({markers})
    }

    createMarkers = (map) => {
        return this.state.venues.map(venue => {
            const marker = new window.google.maps.Marker({position: venue.location, map: map});
            marker.id = venue.id
            marker.name = venue.name
            marker.addListener('click', () => this.openInfo(venue));
            this.fitBounds(marker.position);
            return marker;
        })
    }

    updateQuery = (query) => {
        const match = new RegExp(escapeRegExp(query), 'i');
        this.setState({visibleVenues: this.state.venues.filter(venue => match.test(venue.name))})
        if (this.state.infoWindow) {
            this.state.infoWindow.close();
        }

        this.state.markers.map(marker => {
            marker.setVisible(match.test(marker.name));
        })
    }

    openInfo = (venue) => {
        this.state.infoWindow.setContent(`<h4>${venue.name}</h4><p>${venue.location.address}</p>`);
        const marker = this.state.markers.find(marker => marker.id == venue.id)
        this.state.infoWindow.open(this.state.map, marker);
        this.state.map.panTo(marker.getPosition());
    }

    fitBounds = (position) => {
        this.state.bounds.extend(position);
        this.state.map.fitBounds(this.state.bounds);
    }

    render() {
        return (
            <Container fluid={true} className="h-100">
                { this.state.venues.length > 0 &&
                <Row className="h-100">
                    <Col xs="12" md="4">
                        <Sidebar venues={this.state.visibleVenues} onSearch={this.updateQuery} onOpenInfo={this.openInfo}/>
                    </Col>
                    <Col xs="12" md="8">
                        <Map onCreate={this.setMap} venues={this.state.visibleVenues} query={this.state.query}/>
                    </Col>
                </Row>
                }
            </Container>
        );
    }
}

export default App;
