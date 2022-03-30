'use-strict';
import axios from 'axios';
import React from 'react';
import { Form, Button } from "react-bootstrap";
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

  handleChange = (event) => { // event handler for input of location on Form.
    this.setState({ location: event.target.value }); // sets the state of Explorer.js location to the input from the form. event.target.value
  }

  hideModal = () => { // swaps the state of modalDataState to false, which is passed to ErrModal.js through props, and is used as onHide
    this.setState({
      modalDataState: false,
    });
  }

  openModal = (errorMessage) => { // swaps the state of modalDataState to true, which is passed to ErrModal.js through props and is used as show
    this.setState({
      modalDataState: true
    });
    this.setState({ // this sets the errorMessage to state which is then passed to the ErrModal. same as OpenModal HideModal methods, Through Props
      errorMessage: errorMessage
    });
  }

  getLoc = async (event) => { // async, since we are querying an API and must wait for the response. Do the same when querying a server
    event.preventDefault() // we need this here, since this is a handler on a button press. 
    // query the api for the data
    try {
      let cityData = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.location}&format=json`)
      this.setState({ data: cityData.data[0] });
      this.getForecast(); // method call to get forecast now that we have the location we need to query that API
      this.getMovies(); // method call to movies now that we have the city name we need. 
    } catch (e) { // If the try fails, we receive an error as response. If we do, it triggers the catch, which passes the error to openModal as e (event)
      this.openModal(e)
    }
  }

  getForecast = async () => { // async just like getLoc

    let forecastData = await axios.get(`${process.env.REACT_APP_SERVER}/weather?city=${this.state.location}`) // process.env.REACT_APP_SERVER calls the .env
    console.log(forecastData);
    this.setState({
      forecast: forecastData.data[0] // sets state to correct data object within the forcast data we recieve from API, this could be done on backend.
    })
    console.log(`forecast state: ${forecastData}`);
  }

  getMovies = async () => {
    let movieData = await axios.get(`${process.env.REACT_APP_SERVER}/movies?city=${this.state.location}`)
    this.setState({
      movies: movieData.data
    })
    console.log(`Movies state: ${movieData.data.moviesParsed}`); // we had to dial deep into the movie properties to get what we wanted. hence data.moviesParsed. Again, this probably should have been handled before the backend sent the movies up as its response. 
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
            date={this.state.forecast.time}
            city={this.state.location}
            foreOne={this.state.forecast.forecast}
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
