import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Marker extends Component {

    componentDidMount = () => {
        this.createMarker();
    };

    createMarker() {
        const {location, map} = this.props
        const position = { lat: location.lat, lng: location.lng };

        const marker = new window.google.maps.Marker({position: position, map: map});
        marker.addListener('click', function() {
            console.log('click');
        });
        // this.state.bounds.extend(marker.position);
    }

    render() {
        return null
    }
}

export default Marker