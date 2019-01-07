import React, {Component} from 'react'
import PropTypes from 'prop-types'

const google = window.google;

class Map extends Component {

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
                const script = document.createElement("script");
                const API = 'AIzaSyC0FRwnvyqQbxEaU8JOuCojITxhb3bxdCQ';
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
                script.async = true;
                document
                    .body
                    .appendChild(script);
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
        this
            .getGoogleMaps()
            .then((google) => {
                const uluru = {
                    lat: -30.0331,
                    lng: -51.2300
                };
                const map = new window.google.maps.Map(document.getElementById('map'), {
                        zoom: 15,
                        center: uluru
                    });
                const marker = new window.google.maps.Marker({position: uluru, map: map});
            });
    }

    render() {
        return <div id="map" className="h-100"></div>
    }
}

export default Map