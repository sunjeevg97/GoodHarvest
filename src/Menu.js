import React, {useState} from 'react';
import Component from 'react';
import { db } from './firebase';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ButtonToolbar from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
const MarginWrap = styled.section `
    margin-top:30px;
`;
const Wrapper = styled.section `
    height:100vh;
    width:100%;
`;

const BgStyles = styled.div`
        z-index: 0;
        height: 20vh;
        width: 100%;
        overflow: none;
        top: 0px;
        left: 0px;
        background-color: #0061f2;
        background-image: linear-gradient(135deg, #0061f2 0%, rgba(105, 0, 199, 0.9) 100%);
        border-bottom-left-radius:50%;
        border-bottom-right-radius:50%;
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
        margin: auto;
        padding-top: 20px;
`;

const MenuContainer = styled.div`
        padding-top: 50px;
        width: 100%;
        height: 350px;
        margin: auto;
`;

const FilterContainer = styled.div`
       width: 40%;
       height: 350px;
       background-color: white;
       border-radius: 50px;
       box-shadow:  20px 20px 60px #d9d9d9,
             -20px -20px 60px #ffffff;
       margin-left: 200px;
       
`;

const BodyContainer = styled.div`
       width: 100%;
       height: 350px;
       background-color: white;
       border-radius: 50px;
       box-shadow:  20px 20px 60px #d9d9d9,
             -20px -20px 60px #ffffff;
       margin-left: -200px;
`;
export class Menu extends React.Component{
    constructor(props){
        super(props);

    
       this.state = {
           market_name: '',
           farm: [],
           isLoading: true
        }
    }

  async componentDidMount(){
    let venueId = this.props.location.state.venue_id;

    
    let venueName = this.props.location.state.venue_name;
    console.log();
    
    this.setState({market_name: venueName});

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
        
        console.log(this.state.market_name);
        console.log(this.state.farm);
            return (
              <React.Fragment style={{overflow: 'scroll'}}>
              <Wrapper style={{overflow: 'scroll'}}>
              <BgStyles><HeaderStyleImg><h1 className = 'd-flex justify-content-center font-weight-bold'>{this.state.market_name}</h1></HeaderStyleImg></BgStyles>
              
              <MenuContainer>
                <Row>
                    <Col>
                         <FilterContainer>
                         <Col>
                         <ButtonToolbar vertical className = "mr-12 my-5">
                         
                         {
                                this.state.farm.map((item)=>
                                    <Button style={{padding: '10px'}}>{item.name}</Button>
                                    

                            )
                    
                        }
                    
                        </ButtonToolbar>
                        </Col>
                    </FilterContainer>
                    </Col>
                  <Col>
                  <BodyContainer></BodyContainer>
                  </Col>
                
                </Row>

                </MenuContainer>
              </Wrapper>
              </React.Fragment>
            )

       
    }
}