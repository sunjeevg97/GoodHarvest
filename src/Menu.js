import React, {useState} from 'react';
import Component from 'react';
import { db } from './firebase';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { Redirect } from 'react-router-dom';
import {Navigation} from './components/Navigation';
import Calendar from 'react-calendar';
import bgImg from './assets/bgImg.jpg';
import cfarms1 from './assets/cfarms1.jpg';
import cfarms from './assets/cfarms.jpg';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Layout } from './components/Layout';
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

const Wrapper = styled.section `
    height:100vh;
    width:100%;

`;

const NavBody = styled.div`
    height: 50px;
    width: 100%;
    position: relative;
    background-color: transparent;
    top:25px;
    border-radius: 50px;
    display: inline-block;
    margin-bottom: 50px;
`;

const Nav = styled.div `
    height: 50px;
    width: 10%;
    position: relative;
    background-color: transparent;
    margin-left: 5%;
    border-radius: 50px;
    color:white;
    display: inline-block;
    font-size: 25em;
}
`;

const NavRight = styled.div `
    height: 50px;
    width: 10%;
    position: relative;
    background-color: transparent;
    margin-left: 67.5%;
    margin-right: 5%;
    border-radius: 50px;
    display: inline-block;

}
`;

const FilterBar = styled.div `
    display: inline-block;
    height: 200px;
    width: 20%;
    position: relative;
    margin-left: 5%;
    margin-bottom: 50px;
    top: 15px;
    background-color: white;
    border-radius: 50px;
    color:white;
    box-shadow:  5px 5px 30px #d9d9d9,
          -5px -5px 30px #ffffff;

}
`;
const FilterBarAlt = styled.div `
    display: inline-block;
    height: 200px;
    width: 20%;
    position: relative;
    margin-left: 3%;
    margin-bottom: 50px;
    top: 15px;
    background-color: white;
    border-radius: 50px;
    color:white;
    box-shadow:  5px 5px 30px #d9d9d9,
          -5px -5px 30px #ffffff;
}
`;



const Banner  = styled.img`
    height: 40vh;
    width: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: fill;
    position: relative;
`;



const BgStyles = styled.div`

        z-index: 0;
        height: 40vh;
        width: 100%;
        overflow: none;
        top: 0px;
        left: 0px;
        background-color: #0061f2;
        background-image: linear-gradient(135deg, #0061f2 0%, rgba(105, 0, 199, 0.8) 100%);
        border-bottom-left-radius:15%;
        border-bottom-right-radius:15%;
        position: relative;
        box-shadow:  20px 20px 60px #d9d9d9,
              -20px -20px 60px #ffffff;

`;

const HeaderStyle = styled.div`
        padding-top: 25px;
        padding-bottom: 25px;
        width: 100%;
        font-size: 15em;
        text-align: center;
`;

const HeaderStyleImg = styled.div`
        width: 100%;
        font-size: 40em;
        text-align: center;
        color: white;
        position: absolute;
        margin:0;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
`;

const MenuContainer = styled.div`
        width: 100%;
        height: 800px;
        background-color: white;
        margin: auto;
        margin-top: 25px;
        margin-bottom: 25px;
`;

const FilterBodyCont = styled.div`
      width: 100%;
      background-color: transparent;
      height: 300px;
      position: relative;
      overflow: scroll;
      overflow-y: hidden;
      overflow-x: scroll;
      display: inline-block;
      white-space: nowrap;
`;

const FilterBody = styled.div`
        width: 20%;
        height: 200px;
        background-color: white;
        margin: auto;
        border-radius: 50px;
        box-shadow:  5px 5px 30px #d9d9d9,
              -5px -5px 30px #ffffff;
        margin-top: 25px;
        margin-bottom: 25px;
        position: relative;
        display: inline-block;
        margin-left: 5%;
        margin-right: 5%;
        margin-top: 5%;
`;

const OverLayImg = styled.div`
        position: fixed; /* Sit on top of the page content */
        display: none; /* Hidden by default */
        width: 100%; /* Full width (cover the whole page) */
        height: 100%; /* Full height (cover the whole page) */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5); /* Black background with opacity */
        z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
        cursor: pointer; /* Add a pointer on hover */
`;


const FarmImg = styled.img`
      background-position: center;
      background-repeat: no-repeat;
      background-size: fill;
      background: 'linear-gradient(to right, #430089, #82ffa1)';
      width: 20%;
      height: 200px;
      margin: auto;
      border-radius: 50px;
      box-shadow:  5px 5px 30px #d9d9d9,
            -5px -5px 30px #ffffff;
      margin-top: 25px;
      margin-bottom: 25px;
      position: relative;
      display: inline-block;
      margin-left: 5%;
      margin-right: 5%;
      margin-top: 5%;
`;


const FilterContainer = styled.div`
      display: inline-block;
      vertical-align: top;
       width: 20%;
       height: 350px;
       background-color: white;
       border-radius: 50px;
       box-shadow:  20px 20px 60px #d9d9d9,
             -20px -20px 60px #ffffff;
       margin: auto;
       margin-left: 5%;
       position: top;
`;



const AdditionalContainer = styled.div`
      display: block;
      vertical-align: top;
       width: 15%;
       height: 350px;
       background-color: white;
       border-radius: 50px;
       box-shadow:  20px 20px 60px #d9d9d9,
             -20px -20px 60px #ffffff;
       margin: auto;
       margin-left: 5%;
       position: top;
`;

const BodyContainer = styled.div`
      display: inline-block;
       width: 66%;
       height: 800px;
       background-color: white;
       border-radius: 50px;
       box-shadow:  20px 20px 60px #d9d9d9,
             -20px -20px 60px #ffffff;
       margin: auto;
       margin-left: 3%;
       margin-right: 5%;
`;

export class Menu extends React.Component{
    constructor(props){
        super(props);


       this.state = {
           farm: [],
           isLoading: true
        }
    }

  async componentDidMount(){
    let venueId = this.props.location.state.venue_id;

    let producersRef = await db.collection('venues').doc(venueId).collection("Producers").get();

    let farmArr = [];
    for(const producer of producersRef.docs){
        let isAttending = producer.get('isAttending');

        if(isAttending == true){
            let fname = producer.get("name");

            let farmRef = await db.collection('venues').doc(venueId).collection("Producers").doc(producer.id).collection("Inventory").get();
            let itemsArr = []

            for(const i of farmRef.docs){
                let iName = i.id;
                let itemWeight = i.get('unit');
                let itemPrice = i.get('price');

                let itemObj = {
                    name : iName,
                    weight: itemWeight,
                    price: itemPrice
                }

                itemsArr.push(itemObj);


            }

            let farmObj = {
                name: fname,
                inventory: itemsArr
            }
            farmArr.push(farmObj);


        }

    }

    this.setState({farm: farmArr});

    console.log(this.state.farm);


  }


    render(){

            return (
              <React.Fragment style={{overflow: 'scroll'}}>
                <Wrapper style={{overflow: 'scroll'}}>
                  <BgStyles>
                  <NavBody>
                  <Nav><h1>GoodHarvest</h1></Nav> <NavRight><h1 style={{width: '100%',textAlign: 'center',color:'white',fontSize:'2em'}}>Cart (0)</h1></NavRight>
                  </NavBody>
                      <HeaderStyleImg><h1>Forest Green Park Market</h1></HeaderStyleImg>
                  </BgStyles>
                <FilterBodyCont>
                  <FarmImg src={ cfarms } style={{borderStyle:'solid',borderWidth:'2px',borderColor:'green'}} />
                  <FarmImg src={ cfarms1 } style={{backgroundColor:'rgba(0,0,0,0.5)',opacity:'0.5'}}/>
                  <FarmImg src={ bgImg } style={{backgroundColor:'rgba(0,0,0,0.5)',opacity:'0.5'}}/>
                  <FarmImg src={ cfarms } style={{backgroundColor:'rgba(0,0,0,0.5)',opacity:'0.5'}}/>
                  <FarmImg src={ cfarms } style={{backgroundColor:'rgba(0,0,0,0.5)',opacity:'0.5'}}/>
                </FilterBodyCont>
                <MenuContainer>
                  <FilterContainer><h1 style={{marginTop:'10%',width:'100%',textAlign:'center',color:'black',fontSize:'2em'}}>Cucino Farms</h1></FilterContainer>
                  <BodyContainer></BodyContainer>
                </MenuContainer>
                </Wrapper>
              </React.Fragment>
            )

    }
}
