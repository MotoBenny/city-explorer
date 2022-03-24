import React from "react";
import { Card } from 'react-bootstrap';

class Movies extends React.Component {
  render() {
    console.log(this.props)
    return (
      <>
        <Card>
          <Card.Body>
            <Card.Header> Movie title:{this.props.title} </Card.Header>
            <Card.Text>
              Movie Overview:{this.props.overview}
            </Card.Text>
            <Card.Text>
              Vote Average:{this.props.vote_average}
            </Card.Text>
            <Card.Text>
              vote count:{this.props.vote_count}
            </Card.Text>
            <Card.Text>
              popularity:{this.props.popularity}
            </Card.Text>
            <Card.Text>
              release date:{this.props.release_date}
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Movies