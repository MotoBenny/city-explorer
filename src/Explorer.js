'use-strict';
import axios from 'axios';
import React from 'react';
import { Form, Button, Card } from "react-bootstrap";
import Location from './Location';
import ForecastCard from './Weather';
import Movies from './Movies';

class Explorer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      location: '',
      errorMessage: '',
      modalDataState: false,
      forecast: '',
      movies: ''
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
      this.getForecast();
      this.getMovies();
    } catch (e) {
      this.openModal(e)
    }
  }

  getForecast = async () => {
    // event.preventDefault();
    let forecastData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.location}`)
    this.setState({
      forecast: forecastData
    })
    console.log(`forecast state: ${forecastData}`);
  }

  getMovies = async () => {
    let movieData = await axios.get(`${process.env.REACT_APP_SERVER}/movies?city_name=${this.state.location}`)

    this.setState({
      movies: movieData.data.moviesParsed
    })
    console.log(`Movies state: ${movieData.data.moviesParsed}`);
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

        {this.state.forecast ? (
          <ForecastCard
            date={this.state.forecast.data.date}
            city={this.state.forecast.data.cityName}
            foreOne={this.state.forecast.data.description}
          />
        ) : null}
        {this.state.movies ? (
          this.state.movies.map((element) =>
            <Movies
              title={element.title}
              overview={element.overview}
              vote_average={element.vote_average}
              vote_count={element.vote_count}
              popularity={element.popularity}
              release_date={element.release_date}
            />
          )) : null}
      </>
    );
  }
}


export default Explorer;

