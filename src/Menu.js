import React, {useState} from 'react';
import Component from 'react';
import { db } from './firebase';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Wrapper = styled.section `
    height:100vh;
    width:100%;
`;

const FarmLabelSection = styled.section `
    margin-top:25px;
    margin-left:60px;
`;
const NavBody = styled.div`
    height: 50px;
    width: 100%;
    position: relative;
    background-color: transparent;
    top:25px;
    border-radius: 50px;
    display: inline-block;
`;

const Nav = styled.div `
    height: 50px;
    width: 10%;
    position: relative;
    background-color: white;
    margin-left: 5%;
    border-radius: 50px;
    border-style: solid;
    border-width: 1px;
    border-color: white;
    color:white;
    display: inline-block;
}
`;

const NavRight = styled.div `
    height: 50px;
    width: 10%;
    position: relative;
    background-color: white;
    margin-left: 67.5%;
    margin-right: 5%;
    border-radius: 50px;
    border-style: solid;
    border-width: 1px;
    border-color: white;
    color:white;
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
        margin-top: 25px;
        margin-bottom: 25px;
        margin-left: 60px;
`;

const FilterBody = styled.div`
        width: 100%;
        height: auto;
        background-color: transparent;
        margin: auto;
        margin-top: 25px;
        margin-bottom: 25px;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space:nowrap;
`;

const FilterContainer = styled.div`
      display: inline-block;
      vertical-align: top;
       width: 20%;
       height: 350px;
       background-color: white;
       border-radius: 50px;
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

  showMenu = e => {
      var venueName = e.target.name;

      console.log(venueName);

  }

    render(){
        
            return (
                <React.Fragment style={{overflow: 'scroll'}}>
                <Wrapper style={{overflow: 'scroll'}}>
                  <BgStyles>
                  <NavBody>
                  <Nav></Nav> <NavRight> </NavRight>
                  </NavBody>
                      <HeaderStyleImg><h1>Forest Green Park Market</h1></HeaderStyleImg>
                  </BgStyles>

                    <FarmLabelSection>
                    <div class="row flex-row flex-nowrap">
                        
                                {this.state.farm.map((item) => (
                                <Col>
                                <Card className = "bg-white rounded shadow rounded-lg" style={{padding:'10px', height:'200px', width: '18rem'}}>
                                    <Card.Body>
                                    <Card.Title></Card.Title>
                                    <Card.Text>
                                        <h3>{item.name}</h3>
                                    </Card.Text>
                                    <a href="#" name = {item.name} className="stretched-link" onClick = {this.showMenu}></a>
                                    </Card.Body>
                                </Card>
                                </Col>    
                            ))}
                        
                    </div>
                    </FarmLabelSection>
                    
                    
                    
                    <div class="row flex-row flex-nowrap">
                    <MenuContainer>
                    
                                <Col>
                                <Card className = "bg-white rounded shadow rounded-lg" style={{padding:'20px', height:'350px', width: '18rem'}}>
                                    <Card.Body>
                                    <Card.Title>Details</Card.Title>
                                    <Card.Text>
                                        
                                    </Card.Text>
                                    
                                    </Card.Body>
                                </Card>
                                </Col>    
                                <Col> 
                                <Card className = "bg-white rounded shadow rounded-lg" style={{height:'500px', width: '60rem'}}>
                                    <Card.Body>
                                    <Card.Title>Details</Card.Title>
                                    <Card.Text>
                                        
                                    </Card.Text>
                                    
                                    </Card.Body>
                                </Card>
                                </Col>  
                    </MenuContainer>       
                    </div>


                </Wrapper>
              </React.Fragment>

            )

       
    }
}