import React from "react";
import { Card } from 'react-bootstrap';

class ForecastCard extends React.Component {

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>Forecast for {this.props.city}</Card.Title>
            <Card.Text>
              on this date {this.props.date}
            </Card.Text>
            <Card.Text>
              The forecast is {this.props.foreOne}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }

}

export default ForecastCard;
