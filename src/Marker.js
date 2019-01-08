import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Marker extends Component {

    componentDidMount = () => {
        this.createMarker();
    };

    createMarker() {
        const { venue, map } = this.props
        const position = { lat: venue.location.lat, lng: venue.location.lng };

        const marker = new window.google.maps.Marker({position: position, map: map});
        marker.addListener('click', () => this.props.onClickMarker(marker, venue));
        this.props.onCreate(marker.position);
    }

    render() {
        return null
    }
}

export default Marker