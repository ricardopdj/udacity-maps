import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Marker from './Marker'

const google = window.google;

class Map extends Component {

    state = {
        map: null,
        mapLoaded: false,
        bounds: null,
        query: ''
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
        const { map } = this.state
        const { venues } = this.props

        // Once the Google Maps API has finished loading, initialize the map
        this.getGoogleMaps().then((google) => {
            this.createMap();
            // this.setState({bounds: new window.google.maps.LatLngBounds()})
            // this.createMarkers()
            // this.state.map.fitBounds(this.state.bounds);
        });
    }

    createMap() {
        this.setState({
            map: new window.google.maps.Map(
                document.getElementById('map'),
                {
                    zoom: 15,
                    center: { lat: -30.0331, lng: -51.2300 }
                }
            ),
            mapLoaded: true
        });
    }




    render() {
        const {venues} = this.props
        const {query} = this.state

        let showingMarkers
        if (query) {
            // const match = new RegExp(escapeRegExp(query), 'i')
            // showingContacts = contacts.filter((contact) => match.test(contact.name))
            showingMarkers = null;
        } else {
            showingMarkers = venues
        }

        return (
        <div id="map" className="h-100">
        {
            this.state.mapLoaded && this.props.venues.length > 0 &&
            showingMarkers.map((venue, index) => (
                <Marker
                    key={venue.id}
                    location={venue.location}
                    map={this.state.map}
                />
            ))
        }
        </div>
        )
    }
}

export default Map