import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Debounce } from 'react-throttle';
import escapeRegExp from 'escape-string-regexp'
import {
        InputGroup,
        InputGroupAddon,
        Button,
        Input,
        ListGroup,
        ListGroupItem
    } from 'reactstrap';

class Sidebar extends Component {

    updateQuery = (query) => {
        this.props.onSearch(query);
    }

    openInfo = (venue) => {
        this.props.onOpenInfo(venue);
    }

    render() {
        const { venues} = this.props

        return (
            <aside className="py-2">
                <h1>Porto Alegre Sights</h1>
                <InputGroup className="my-4">
                    <Debounce time="400" handler="onChange">
                        <Input placeholder="Filtrar" onChange={(event) => this.updateQuery(event.target.value)}/>
                    </Debounce>
                </InputGroup>
                <ListGroup>
                    {
                        venues.length > 0 &&
                        venues.map((venue, index) =>
                            <ListGroupItem tag="button" key={index} onClick={() => this.openInfo(venue)}>{venue.name}</ListGroupItem>
                        )
                    }
                </ListGroup>
            </aside>
        )
    }
}

export default Sidebar