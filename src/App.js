import React, {Component} from 'react';
import './App.css';
import {Container, Row, Col} from 'reactstrap';
import PropTypes from 'prop-types'
import Map from './Map'
import Sidebar from './Sidebar'
import * as FoursquareAPI from './FoursquareAPI'
import escapeRegExp from 'escape-string-regexp'

class App extends Component {

    state = {
        apiError: false,
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
            })
            .catch(() => { this.setState({apiError: true }) });
    }

    setMap = (map) => {
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
            marker.addListener('click', () => this.getInfo(venue));
            this.fitBounds(marker.position);
            return marker;
        })
    }

    updateQuery = (query) => {
        const match = new RegExp(escapeRegExp(query), 'i');
        this.setState({visibleVenues: this.state.venues.filter(venue => match.test(venue.name))})
        { this.state.infoWindow && this.state.infoWindow.close() }

        this.state.markers.map(marker => {
            return marker.setVisible(match.test(marker.name));
        })
    }

    getInfo = (venue) => {
        if (!venue.photo) {
            FoursquareAPI
            .getPhoto(venue.id)
                .then((photo) => {
                    venue.photo = photo
                    return venue
                })
                .then((venue) => this.openInfo(venue))
                .catch(err => console.log("Erro ao consultar a api do Foursquare", err));
        } else {
            this.openInfo(venue)
        }
    }

    // Create and open InfoWindow of the selected venue/marker
    openInfo = (venue) => {
        let infoContent = `<h4>${venue.name}</h4><p>${venue.location.address}</p>`
        if (venue.photo) {
            infoContent = `${infoContent}<img src="${venue.photo}" alt="${venue.name}"/>`
        }
        this.state.infoWindow.setContent(infoContent);
        const marker = this.state.markers.find(marker => marker.id === venue.id)
        this.state.infoWindow.open(this.state.map, marker);
        this.state.map.panTo(marker.getPosition());
        marker.setAnimation(window.google.maps.Animation.DROP);
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
                    <Col xs="12" lg="4">
                        <Sidebar venues={this.state.visibleVenues} onSearch={this.updateQuery} onGetInfo={this.getInfo}/>
                    </Col>
                    <Col xs="12" lg="8">
                        <Map onCreate={this.setMap} venues={this.state.visibleVenues}/>
                    </Col>
                </Row>
                }

                { this.state.venues.length > 0 &&
                <Row>
                    <Col xs="12">
                        <div className="text-center py-3">
                            Made with <a href="https://developer.foursquare.com">Foursquare API</a> and <a href="https://cloud.google.com/maps-platform">Google Maps API</a>
                        </div>
                    </Col>
                </Row>
                }

                { !this.state.venues && !this.state.apiError &&
                    <Row className="h-100 align-items-center">
                        <Col xs="12">
                            <div className="text-center py-3">
                                <span className="align-middle">Loading some Porto Alegre sights! Wait...</span>
                            </div>
                        </Col>
                    </Row>
                }

                { this.state.apiError &&
                    <Row className="h-100 align-items-center">
                        <Col xs="12">
                            <div className="text-center py-3">
                                <span className="align-middle">Sorry! Something wrong happen, please try later :(</span>
                            </div>
                        </Col>
                    </Row>
                }
            </Container>
        );
    }
}

export default App;
