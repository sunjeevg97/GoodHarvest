import React from 'react';
import styled from 'styled-components';
import bgImg from './assets/bgImg.jpg';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Layout } from './components/Layout';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavInner } from './components/NavInner';
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



export const Venue = () => (
  <React.Fragment>
  <NavInner />
  <Styles>
  </Styles>
  </React.Fragment>
)
