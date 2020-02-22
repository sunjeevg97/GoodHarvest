import React from 'react';
import styled from 'styled-components';
import bgImg from './assets/bgImg.jpg';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Layout } from './components/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Navigation } from './components/Navigation';
import { ReactCalendar } from './components/Calendar';
import InputGroup  from 'react-bootstrap/InputGroup';
import DropdownButton  from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import firebase from './firebase';


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
export const Landing = () => (
    <React.Fragment>
        <Background src={ bgImg } />
        <BgStyles/>
        <Navigation />
        <Styles>
            <Jumbotron>
                <Container>
                        <h1 className="text-secondary display-5">Book company events</h1>
                        <h1 className="text-secondary display-5">in minutes on <span className="font-weight-bold">Luau</span></h1>
                                <Form>
                                    <Row>
                                        <Col className="col-6">
                                    <Form.Group controlId="formLocation">
                                        <Form.Label className="text-secondary font-weight-bold">Where are you?</Form.Label>
                                        <Form.Control placeholder="Location" />
                                    </Form.Group>
                                        </Col>
                                        <Col>
                                        <Form.Group controlId="formNumAttendes">
                                        <Form.Label className="text-secondary font-weight-bold">How many are going?</Form.Label>
                                        <Form.Control placeholder="Number of People" />
                                    </Form.Group>
                                    </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                        <Form.Group controlId="formDate">
                                    <Form.Label className="text-secondary font-weight-bold">When?</Form.Label>
                                    <InputGroup className="sm">

                                        <FormControl
                                            placeholder="mm/dd/yyyy"
                                            aria-label="date"
                                            aria-describedby="basic-addon2"
                                        />

                                        <DropdownButton
                                            as={InputGroup.Append}
                                            variant="outline-secondary"
                                            className = "dropup sm"
                                            title= {<FontAwesomeIcon icon={faCalendarAlt}/>}
                                            id="date-dropdown"
                                        >
                                            <ReactCalendar />
                                        </DropdownButton>
                                        </InputGroup>

                                    </Form.Group>
                                    </Col>
                                    <Col>
                                    </Col>
                                    </Row>

                                        <Button variant="primary btn-lg font-weight-bold text-light" type="submit">
                                            Lets Luau!
                                        </Button>
                                    </Form>
                            </Container>
                    </Jumbotron>
            </Styles>
        </React.Fragment>

);
