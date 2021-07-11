import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from './components/Navigation';
import styled from 'styled-components';
import bgImg from './assets/bgImg.jpg';
import Container from 'react-bootstrap/Container';
import {Link} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Jumbotron from 'react-bootstrap/Jumbotron';
import $ from 'jquery';

var wH = $(window).height();
const Background  = styled.img`
    height: 100vh;
    width: 100%;
    background: 'linear-gradient(45deg, #430089, #82ffa1)'; 
`;

const Styles = styled.div`
    .jumbotron{
        position: absolute;
        top:0;
        margin-top:10%;
        margin-left:10%;
        height: 550px;
        width: 400px;
        border-style: solid;
        border-color:#EEF3DB;
    }

    .h1{
        width:auto;
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

export class Landing extends React.Component{
    constructor(props) {
        super(props);

        this.state = {isSignUp: true};
       
        this.handleSignInClick = this.handleSignInClick.bind(this);
        this.handleSignUpClick = this.handleSignUpClick.bind(this);
       
    }

    handleSignInClick(){
        this.setState({isSignUp: false});
    }

    handleSignUpClick(){
        this.setState({isSignUp: true});
    }


    render(){
       
        const isSignUp = this.state.isSignUp;

        let title;
        let authComponent;
        let text;

        if(isSignUp){
            title = <h2 className = "text-primary text-center"> Sign Up </h2>
            authComponent = <SignUp /> 
            text = <p className="text-dark mt-5 text-center"> Already have an account?{" "} 
                        <a href = "#" onClick={this.handleSignInClick}>
                            Sign In
                         </a>{" "}
                    <br />{" "}
                    </p> 
        }else{
            title = <h2 className = "text-primary text-center"> Sign In </h2>
            authComponent =  <SignIn /> ;
            text = <p className="text-dark mt-5 text-center"> Don't have an account?{" "} 
                        <a href = "#" onClick={this.handleSignUpClick}>
                            Sign Up
                         </a>{" "}
                    <br />{" "}
                    </p> 
        }
        


        return(
            <React.Fragment>
        <Background src={ bgImg } />
        <Navigation/>
        <BgStyles/>
        <Styles>
           
            <Jumbotron>

                <Container fluid='lg'>
                    {title}
                    {authComponent}
                    {text}
                </Container>
        
                    </Jumbotron>
            </Styles>
        </React.Fragment>
        );
    }


}