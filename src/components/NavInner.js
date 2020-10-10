import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import bgImg from '../assets/Group1.png';

export const NavInner = () => (
<React.Fragment>
<Navbar bg="light" variant="light">
    <Navbar.Brand href="/">
      <img
        alt=""
        src= { bgImg }
        width="30"
        height="30"
        className="d-inline-block align-top"
      />

    </Navbar.Brand>
    <Nav className="ml-auto">
        <Nav.Item><Nav.Link><Link to="/signin">SignIn</Link></Nav.Link></Nav.Item>
     </Nav>
  </Navbar>
</React.Fragment>
)
