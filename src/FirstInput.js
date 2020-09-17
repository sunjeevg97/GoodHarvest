import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import {Navigation} from './components/Navigation';
import Component from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import bgImg from './assets/bgImg.jpg';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Layout } from './components/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup  from 'react-bootstrap/InputGroup';
import DropdownButton  from 'react-bootstrap/DropdownButton';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import $ from 'jquery';

var wH = $(window).height();
const Background  = styled.img`
    height: 100%;
    width: 100%;
    background: 'linear-gradient(to right, #430089, #82ffa1)';
`;

const Styles = styled.div`
    .jumbotron{
        position: absolute;
        top:0;
        margin-top:10%;
        margin-left:10%;
        background:none;
        border-style: solid;
        border-color:#EEF3DB;
    }

    .h1{
        width:auto;
    }

`;
const Header = styled.div`
    .jumbotron{
        position: absolute;
        top:0;
        margin-top:5%;
        margin-left:60%;
        background:none;
    }
    .h1{
        background-color:#000;
    }
`;
const BgStyles = styled.div`

        z-index: 0;
        height: 100%;
        width: 100%;
        position: fixed;
        overflow: auto;
        top: 0px;
        left: 0px;
        background: rgba(0, 0, 0, 0.7); /*can be anything, of course*/

`;

export class FirstInput extends React.Component{
    constructor(props) {
        super(props);

        this.state = {time: null, location: null, date: null, redirect: null};
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleLocChange = this.handleLocChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }


    handleDateChange = (dateOption) =>{
        this.setState({date:dateOption ? dateOption.value: ''});
    }

    handleTimeChange = (timeOption) => {
        this.setState({time:timeOption ? timeOption.value: ''});
    }

    handleLocChange= (locOption) =>{
        this.setState({location:locOption ? locOption.value: ''});
    }


    handleSubmit = event =>{
        event.preventDefault();
        if (this.state.date && this.state.location && this.state.time){
            this.setState({ redirect: "/venues"})
        }
        else{
            this.setState({ redirect: null})
        }
    }




    render(){
       
        if(this.state.redirect){
            return <Redirect to={{
                pathname: '/venues',
                state: {date: this.state.date, time: this.state.time, location: this.state.location}
            }}/>
        }

        const getDayDate = (day) => {
            var d = new Date();
            d.setDate(d.getDate() +  (day + 7 - d.getDay()) % 7);

            return d.toLocaleDateString();
        }

        const deliveryTimes = [
            {value:'now', label: 'ASAP'},
            {value: 'later', label: 'A little bit later (1 day max)'}
        ]

        const cities = [
            {value: 'NYC', label: 'New York City, NY'},
            {value: 'SEA', label: 'Seattle, WA'},
            {value: 'LA', label: 'Los Angeles, CA'},
            {value: 'DC', label: 'Washington, D.C.'}
        ]

        const days = [
            {value: 'fri', label: 'This Friday, ' + getDayDate(5)}, 
            {value: 'sat', label: 'This Saturday, ' + getDayDate(6)},
            {value: 'sun', label: 'This Sunday, ' + getDayDate(0)}
        ]


        return(
            <React.Fragment>
        <Background src={ bgImg } />
        <Navigation/>
        <BgStyles/>
        <Styles>
            <Jumbotron>
                <Container fluid='lg'>
                        <h1 className="text-light display-5">Get fresh and locally sourced food in minutes </h1>
                        <h1 className="text-light display-5"><span className="font-weight-bold"></span></h1>
                            
                                <Form onSubmit={this.handleSubmit}>
                                    <Row>
                                        <Col className="col-11">
                                    <Form.Group controlId="formLocation">
                                        <Form.Label className="text-light font-weight-bold">Where are you?</Form.Label>
                                        <InputGroup className="lg" >
                                        <Select
                                                className = "w-50"
                                                options={cities} 
                                                value={cities.find(item => item.value === this.state.location)} 
                                                onChange={this.handleLocChange} />
                                         </InputGroup> 
                                         </Form.Group>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col xs={5}>
                                        <Form.Group controlId="formDate">
                                        <Form.Label className="text-light font-weight-bold">Which day?</Form.Label>
                                        <InputGroup className="lg">

                                        <Select 
                                            className = "w-75"
                                            options = {days}
                                            value = {days.find(item => item.value === this.state.date)}
                                            onChange = {this.handleDateChange}
                                            />
                                         </InputGroup>
                                     
                                    </Form.Group>
                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col xs={5}>
                                    
                                        <Form.Group controlId="formTime">
                                        <Form.Label className="text-light font-weight-bold">When do you want it?</Form.Label>
                                        <InputGroup className="sm float right" >
                                            <Select 
                                                className = "w-75"
                                                options = {deliveryTimes}
                                                value = {deliveryTimes.find(item => item.value === this.state.time)}
                                                onChange = {this.handleTimeChange}/>
                                         </InputGroup>
                                     
                                    </Form.Group>
                                    </Col>
                                   </Row>
                                  

                                        <Button variant="outline-primary btn-lg font-weight-bold" type="submit" value="Submit">
                                            Find Your Harvest
                                        </Button>
                                    </Form>
                            </Container>
        
                    </Jumbotron>
            </Styles>
        </React.Fragment>
        );
    }


}