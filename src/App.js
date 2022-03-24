import './App.css';
import Explorer from './Explorer'
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './location.css'
import './explorer.css'
import { Container, Row } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Row xs={1} sm={2} md={3} lg={4}>
      <Explorer />
      </Row>
    </Container>
  );
}

export default App;
