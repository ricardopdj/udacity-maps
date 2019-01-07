import React, {Component} from 'react'
import PropTypes from 'prop-types'

const google = window.google;

class Map extends Component {

    state = {
        map: null,
        bounds: null
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
        const { places } = this.props

        // Once the Google Maps API has finished loading, initialize the map
        this.getGoogleMaps().then((google) => {
            this.createMap();
            this.setState({bounds: new window.google.maps.LatLngBounds()})
            this.createMarkers()
            this.state.map.fitBounds(this.state.bounds);
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
            )
        });
    }

    createMarkers() {
        {
            this.props.places.length > 0 &&
            this.props.places.map(place => {
                const marker = new window.google.maps.Marker({position: place, map: this.state.map});
                marker.addListener('click', function() {
                    console.log('click');
                });
                this.state.bounds.extend(marker.position);
            })
        }
    }


    render() {
        return <div id="map" className="h-100"></div>
    }
}

export default Map