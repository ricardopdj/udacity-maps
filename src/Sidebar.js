import React from 'react'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle';
import {
        InputGroup,
        Input,
        ListGroup,
        ListGroupItem
    } from 'reactstrap';

const Sidebar = (props) => {

    const updateQuery = (query) => {
        props.onSearch(query);
    }

    const getInfo = (venue) => {
        props.onGetInfo(venue);
    }

    return (
        <aside className="py-2">
            <h1>Porto Alegre Sights</h1>
            <InputGroup className="my-4">
                <Debounce time="400" handler="onChange">
                    <Input placeholder="Filter locations" aria-label="Type a venue name to filter" onChange={(event) => updateQuery(event.target.value)}/>
                </Debounce>
            </InputGroup>
            <ListGroup>
                {
                    props.venues.length > 0 &&
                    props.venues.map((venue, index) =>
                        <ListGroupItem tag="button" key={index} onClick={() => getInfo(venue)}>{venue.name}</ListGroupItem>
                    )
                }
            </ListGroup>
        </aside>
    )
}

Sidebar.propTypes = {
    venues: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onGetInfo: PropTypes.func.isRequired
}

export default Sidebar