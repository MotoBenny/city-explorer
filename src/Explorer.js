'use-strict';
import axios from 'axios';
import React from 'react';
import { Form, Button } from "react-bootstrap";
import Location from './Location';

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      location: ''
    }
  }

  handleChange = (event) => {
    this.setState({ location: event.target.value });
  }

  getLoc = async (event) => {
    event.preventDefault()
    // query the api for the data
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.location}&format=json`)
      this.setState({ data: cityData.data[0] });
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    return (
      <>
        <Form>
          <Form.Label> City Explorer!
          </Form.Label>
          <Form.Control
            onChange={this.handleChange}
            type="text"
            placeholder="Enter A Location" />
          <Button
            variant="primary"
            onClick={this.getLoc}
          >
            Explore!</Button>
        </Form>
        {this.state.data.display_name ? (
          <Location
            city={this.state.data.display_name}
            lat={this.state.data.lat}
            long={this.state.data.lon}
          />
        ) : null}
      </>
    );
  }
}

export default Explorer;