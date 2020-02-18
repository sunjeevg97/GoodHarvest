import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


export const Navigation = () => (
    <Navbar className="fixed-top" expand='lg'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Nav.Item><Nav.Link><Link to="/signin">SignIn</Link></Nav.Link></Nav.Item>
         </Nav>
            </Navbar.Collapse>
    </Navbar>

)