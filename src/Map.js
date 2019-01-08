import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Marker from './Marker'
import escapeRegExp from 'escape-string-regexp'

const google = window.google;

class Map extends Component {
    constructor(props) {
        super(props);
        this.markers = [];
    }

    state = {
        map: null,
        mapLoaded: false,
        bounds: null,
        infoWindow: null,
        visibleMarkers: []
    }

    getGoogleMaps() {
        // If we haven't already defined the promise, define it
        if (!this.googleMapsPromise) {
            this.googleMapsPromise = new Promise((resolve) => {
                // Add a global handler for when the API finishes loading
                window.resolveGoogleMapsPromise = () => {
                    // Resolve the promise
                    resolve(google);

                    // Tidy up
                    delete window.resolveGoogleMapsPromise;
                };

                // Load the Google Maps API
                const API = 'AIzaSyC0FRwnvyqQbxEaU8JOuCojITxhb3bxdCQ';
                const script = document.createElement("script");
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
                script.async = true;
                document.body.appendChild(script);
            });
        }

        // Return a promise for the Google Maps API
        return this.googleMapsPromise;
    }

    componentWillMount() {
        // Start Google Maps API loading since we know we'll soon need it
        this.getGoogleMaps();
    }

    componentDidMount() {
        // Once the Google Maps API has finished loading, initialize the map
        this.getGoogleMaps().then((google) => {
            this.createMap();
            this.setState({bounds: new window.google.maps.LatLngBounds()})
            console.log(this.props.venues);

        });
    }

    createMap() {
        const map = new window.google.maps.Map(
            document.getElementById('map'),
            {
                zoom: 15,
                center: { lat: -30.0331, lng: -51.2300 }
            }
        );
        this.setState({
            map: map,
            infoWindow: new window.google.maps.InfoWindow(),
            mapLoaded: true
        });
    }

    fitBounds = (position) => {
        this.state.bounds.extend(position);
        this.state.map.fitBounds(this.state.bounds);
    }

    openInfoWindow = (marker, venue) => {
        this.state.infoWindow.setContent(`<h4>${venue.name}</h4><p>${venue.location.address}</p>`);
        this.state.infoWindow.open(this.state.map, marker);
        this.state.map.panTo(marker.getPosition());
    }

    createMarker = (venue) => {
        const marker = new window.google.maps.Marker({position: venue.location, map: this.state.map});
        marker.name = venue.name
        this.markers.push(marker);

        // marker.addListener('click', () => this.openInfoWindow(marker, venue));
    }

    clearMarkers() {
        this.markers.map(marker => {
            marker.setMap(null);
        })
    }

    render() {
        const { query, venues} = this.props

        if (query) {
            this.clearMarkers();
        }

        return (
        <div id="map" className="h-100">
        {
            this.state.mapLoaded && venues.length > 0 &&
            venues.map((venue, index) => (
                this.createMarker(venue)
            ))
        }
        </div>
        )
    }
}

export default Map