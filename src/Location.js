import React from 'react';
import { Card } from 'react-bootstrap';

// child of explorer.js
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      // bootstrap card
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.props.city}</Card.Title>
          <Card.Text>
            The Latitude is: {this.props.lat}
          </Card.Text>
          <Card.Text>
            the Longitude is: {this.props.long}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
export default Location;