import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
        InputGroup,
        InputGroupAddon,
        Button,
        Input,
        ListGroup,
        ListGroupItem
    } from 'reactstrap';

class Sidebar extends Component {

    render() {
        const { venues } = this.props

        return (
            <aside className="py-2">
                <h1>Porto Alegre Sights</h1>
                <InputGroup className="my-4">
                    <Input placeholder="Filtrar" />
                    <InputGroupAddon addonType="append">
                    <Button color="secondary">To the Right!</Button>
                    </InputGroupAddon>
                </InputGroup>
                <ListGroup>
                    { venues.length > 0 && venues.map((venue, index) => <ListGroupItem key={index}>{venue.name}</ListGroupItem>) }
                </ListGroup>
            </aside>
        )
    }
}

export default Sidebar