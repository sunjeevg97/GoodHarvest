import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


export const Navigation = () => (
    <Navbar className="fixed-top">
        <Navbar.Brand href="/">Luau</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Button variant='outline-primary'><Link to='/signin'>Sign In</Link></Button>
         </Nav>
            </Navbar.Collapse>
    </Navbar>

)