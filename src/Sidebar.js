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
        const { places } = this.props

        return (
            <aside className="py-2">
                <InputGroup>
                    <Input placeholder="Filtrar" />
                    <InputGroupAddon addonType="append">
                    <Button color="secondary">To the Right!</Button>
                    </InputGroupAddon>
                </InputGroup>
                <ListGroup>
                    { places.length > 0 && places.map((place, index) => <ListGroupItem key={index}>{place.name}</ListGroupItem>) }
                </ListGroup>
            </aside>
        )
    }
}

export default Sidebar