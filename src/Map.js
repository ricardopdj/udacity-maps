import React, {Component} from 'react'
import PropTypes from 'prop-types'

const google = window.google;

class Map extends Component {
    static propTypes = {
        venues: PropTypes.array.isRequired,
        onCreate: PropTypes.func.isRequired
    }

    state = {
        mapLoaded: false,
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
        this.props.onCreate(map)
    }

    render() {
        return (
        <div id="map" className="h-100 mh-">
        </div>
        )
    }
}

export default Map