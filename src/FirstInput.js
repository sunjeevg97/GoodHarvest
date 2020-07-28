import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
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
import $ from 'jquery';

var wH = $(window).height();
const Background  = styled.img`
    height: 100%;
    width: 100%;
    background: 'linear-gradient(to right, #430089, #82ffa1)';
`;
/*const TriangleBottomLeft = styled.div `
    position: absolute;
    height: 100vh;
    width: 55%;
    top:0;
    left:0;
  background-color: #4f5d75;
  clip-path: polygon(0 0, 0 100%, 100% 100%);
`;*/
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

        this.state = {time: '8:00AM', location:'', date: new Date(), redirect: null};
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleLocChange = this.handleLocChange.bind(this);
    }


    handleDateChange = d =>{
        this.setState({date: d});
    }

    handleTimeChange(event){
        this.setState({time:event.target.value});
    }

    handleLocChange (event){
        this.setState({location:event.target.value});
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
        let x = 30; //minutes interval
        let times = []; // time array
        let tt = 0; // start time
        let ap = ['AM', 'PM']; // AM-PM
        
        //loop to increment the time and push results in array
        for (let i=0;tt<24*60; i++) {
          let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
          let mm = (tt%60); // getting minutes of the hour in 0-55 format
          times[i] = ("" + ((hh==12)?12:hh%12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)];
          tt = tt + x;
        }
        
         let timeList = times.map(v => ({
            label: v,
            value: v
         }));


        if(this.state.redirect){
            return <Redirect to={{
                pathname: '/venues',
                state: {date: this.state.date, time: this.state.time, location: this.state.location}
            }}/>
        }
        return(
            <React.Fragment>
        <Background src={ bgImg } />
        
        <BgStyles/>
        <Styles>
            <Jumbotron>
                <Container fluid='lg'>
                        <h1 className="text-secondary display-5">Get fresh, locally sourced foods </h1>
                        <h1 className="text-secondary display-5">in minutes on <span className="font-weight-bold">Harvest</span></h1>
                            
                                <Form onSubmit={this.handleSubmit}>
                                    <Row>
                                        <Col className="col-11">
                                    <Form.Group controlId="formLocation">
                                        <Form.Label className="text-secondary font-weight-bold">Where are you?</Form.Label>
                                        <InputGroup className="lg float right" >
                                        <select className="custom-select" id="locationSelect" value={this.state.location} onChange={this.handleLocChange}>
                                        <option selected>Choose Location</option>
                                        <option value="NYC">New York City, NY</option>
                                        <option value="SEA">Seattle, WA</option>
                                        <option value="LA">Los Angeles, CA</option>
                                        <option value="DC">Washington, D.C.</option>
                                     </select>
                                         </InputGroup>                                    </Form.Group>
                                        </Col>
                                    </Row>
                                    
                                    <Row>
                                        <Col xs={5}>
                                        <Form.Group controlId="formDate">
                                        <Form.Label className="text-secondary font-weight-bold">When do you want it?</Form.Label>
                                        <InputGroup className="lg" >
                                        <FormControl
                                                placeholder="mm/dd/yyyy"
                                                aria-label="date"
                                                aria-describedby="basic-addon2"
                                                value={this.state.date.toLocaleDateString()}/>

                                        <DropdownButton
                                            as={InputGroup.Append}
                                            variant="outline-secondary"
                                            className = "dropup sm"
                                            title= {<FontAwesomeIcon icon={faCalendarAlt}/>}
                                            id="date-dropdown">
                                            <Calendar 
                                                onChange = {this.handleDateChange}
                                                value = {this.state.date}
                                                />
                                    
                                            </DropdownButton>

                                        

                                         </InputGroup>
                                     
                                    </Form.Group>
                                    </Col>
                                    <Col></Col>
                                    <Col xs={5}>
                                    
                                        <Form.Group controlId="formTime">
                                        <Form.Label className="text-secondary font-weight-bold">Delivery Time?</Form.Label>
                                        <InputGroup className="sm float right" >
                                        <select className="custom-select" id="timeSelect" value={this.state.time} onChange={this.handleTimeChange}>
                                            {timeList.map((time, i) => <option key = {i} value={time.value}>{time.label}</option>)}
                                     </select>
                                         </InputGroup>
                                     
                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    </Col>
                                    </Row>

                                        <Button variant="outline-danger btn-lg font-weight-bold" type="submit" value="Submit">
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