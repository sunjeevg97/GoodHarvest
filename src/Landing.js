import React from 'react';
import styled from 'styled-components';
import bgImg from './assets/bgImg.jpg';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Layout } from './components/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const Background  = styled.img`
    width:100%;
    height:100%;
`;

const Styles = styled.div`
    position: absolute;
    top:0;
    margin-top:100px;
    margin-left:50px;
`;

export const Landing = () => (
    <React.Fragment>
        <Background src={ bgImg } />
<Styles>
    <Layout>
    <Jumbotron>
    <Jumbotron fluid>
  <Container>
    <h1>Fluid jumbotron</h1>
    <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="outline-primary" type="submit">
    Submit
  </Button>
</Form>
  </Container>
</Jumbotron>
</Jumbotron>
    </Layout>
</Styles>
    </React.Fragment>
    
);