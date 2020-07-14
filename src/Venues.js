import React, {useState} from 'react';
import Component from 'react';
import { db } from './firebase';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import MapView from './components/MapView';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';

const Wrapper = styled.section `
    height:100vh;
    width:100%;

`;
const MapSection = styled.section`
    height: 100vh;
    width:100%;
`;
const VenueSection = styled.section `
    height:100vh;
    width:100%;
    padding-top:30px;
`;

export class Venues extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            venue_data:[]
        };

    }  

    async componentDidMount() {
        let venues = [];
        let venuesRef = db.collection('venues')
        let locationRef = await venuesRef.where('location', '==', this.props.location.state.location).get();
        for (const venue of locationRef.docs){
            let name = venue.get('name');
            let location = venue.get('location');
            let maxcap = venue.get('maxcap');
            let cuisines = venue.get('cuisines')
            venues.push({
                id: venue.id,
                n: name,
                loc: location,
                cap: maxcap,
                food_type: cuisines
            });

            this.setState({venue_data: venues});
        }

        console.log(this.state.venue_data);
      }
       

    

    render(){
       console.log(this.state.venue_data);
            return (
                <Wrapper>
                      <Row>
                        <Col md='6'>
                            <MapSection>
                                <MapView/>
                            </MapSection>
                        </Col>

                        <Col md='6'>
                        <Container>
                          <VenueSection>
                            <CardDeck>
                                {this.state.venue_data.map((venue,index) => (
                                <Card key = {venue.id} border = "primary" style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src="holder.js/100px180" />
                                    <Card.Body>
                                    <Card.Title>{venue.n}</Card.Title>
                                    <Card.Text>
                                        <ul className="list-unstyled">
                                        <li><small>Location: {venue.loc}</small></li>
                                        <li><small>Max Capacity: {venue.cap}</small></li>
                                        <li><small>Cuisine:{venue.food_type.map((food, x) => (<Badge className="ml-1" variant="secondary">{food}</Badge>))}</small></li>
                                        </ul>
                                    </Card.Text>
                                    <Row>
                                        <Col>
                                        <Button variant="primary">Book Your Luau</Button>
                                        </Col>
                                    </Row>
                                    </Card.Body>
                                </Card>
                            ))}
                            </CardDeck>
                            </VenueSection>
                            </Container>
                        </Col>
                        </Row>
                </Wrapper>
                );
        }
}

