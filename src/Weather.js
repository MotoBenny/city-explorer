import React from "react";
import { Card } from 'react-bootstrap';

class ForecastCard extends React.Component {

  render() {
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Title>Forecast for {this.props.city}</Card.Title>
            <Card.Title>{this.props.dateOne}</Card.Title>
            <Card.Text>
              The weather will be {this.props.foreOne}
            </Card.Text>
          </Card.Body>
        </Card>
        {/* <Card>
          <Card.Body>
            <Card.Title>{this.props.dateTwo}</Card.Title>
            <Card.Text>
              The weather will be {this.props.foreTwo}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>{this.props.dateThree}</Card.Title>
            <Card.Text>
              The weather will be {this.props.foreThree}
            </Card.Text>
          </Card.Body> */}
        {/* </Card> */}
      </>
    );
  }

}

export default ForecastCard;