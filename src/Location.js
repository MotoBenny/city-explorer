import React from 'react';
import { Card } from 'react-bootstrap';

// child of explorer.js
class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {} // had to set empty state here so we could access props. 
  }

  render() {
    let map = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.props.lat},${this.props.long}&zoom=13`
    return (
      // bootstrap card
      <Card id='locCard' style={{ width: '26rem' }}>
        <Card.Body>
          <Card.Title id='locTitle'>{this.props.city}</Card.Title>
          <Card.Text className='locText'>
            The Latitude is: {this.props.lat}
          </Card.Text>
          <Card.Text className='locText'>
            the Longitude is: {this.props.long}
          </Card.Text>
          <Card.Img in='locImg' variant="top" src={map} />
        </Card.Body>
      </Card>
    );
  }
}
export default Location;