import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import {useAuth} from '../contexts/AuthContext'
import {useHistory} from 'react-router-dom'

export default function Navigation() {

    const {currentUser, logout} = useAuth()
    const [error, setError] = useState("")
    const history = useHistory()

    async function handleLogout(){
        setError("")

        try{
            await logout()
            history.push("/")
        }catch{
            setError("Failed to Logout")
        }
    }

    return(
        <Navbar className="fixed-top" expand='lg'>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
        <Navbar.Brand className="font-weight-bold display-1" style={{color: '#ffffff'}}><span className="mb-0 h2">GoodHarvest</span></Navbar.Brand>
        <Nav className="ml-auto">
            <Nav.Link onClick = {handleLogout} className="font-weight-bold" style={{color: '#ffffff'}}>Logout</Nav.Link>
         </Nav>
            </Navbar.Collapse>
        </Navbar>
    )

}