'use-strict';
import axios from 'axios';
import React from 'react';
import { Form, Button } from "react-bootstrap";
import Location from './Location';
import ForecastCard from './Weather';

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      location: '',
      errorMessage: '',
      modalDataState: false,
      forecast: ''
    }
  }

  handleChange = (event) => {
    this.setState({ location: event.target.value });
  }

  hideModal = () => {
    this.setState({
      modalDataState: false,
    });
  }

  openModal = (errorMessage) => {
    this.setState({
      modalDataState: true
    });
    this.setState({
      errorMessage: errorMessage
    });
  }

  getLoc = async (event) => {
    event.preventDefault()
    // query the api for the data
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.location}&format=json`)
      this.setState({ data: cityData.data[0] });
      this.getForecast()
    } catch (e) {
      this.openModal(e)
    }
  }

  getForecast = async () => {
    // event.preventDefault();
    let forecastData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.location}`)
    console.log(forecastData.data)
    this.setState({
      forecast: forecastData.data
    })
  }


  render() {

    return (
      <>
        <Form id='explForm'>
          <Form.Label id="formLabel"> City Explorer!
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
        {this.state.forecast ? ( // create state to hold weather data from server call
          <ForecastCard
            city={this.state.data.display_name}
            foreOne={this.state.forecast.forecastOne}
            dateOne={this.state.forecast.dateOne}
            foreTwo={this.state.forecast.forecastTwo}
            dateTwo={this.state.forecast.dateTwo}
            foreThree={this.state.forecast.forecastThree}
            dateThree={this.state.forecast.dateThree}
          />
        ) : null}
      </>
    );
  }
}

export default Explorer;