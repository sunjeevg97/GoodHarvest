import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


export const Navigation = () => (
    <Navbar className="fixed-top" expand='lg'>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand class="font-weight-bold display-1" style={{color: '#f72585'}}><span class="mb-0 h2">GoodHarvest</span></Navbar.Brand>
        <Nav className="ml-auto">
            <Nav.Link href="#home" class="font-weight-bold" style={{color: '#f72585'}}>About</Nav.Link>
            <Nav.Link href="#link" class="font-weight-bold" style={{color: '#f72585'}}>Sign In</Nav.Link>
         </Nav>
            </Navbar.Collapse>
    </Navbar>

)