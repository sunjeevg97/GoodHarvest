import React, {useState} from 'react';
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
import * as Icons from 'react-bootstrap-icons';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
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

const LoadingSection = styled.section `
width: 300px;
height: 300px;
position: absolute;
left: 50%;
top: 50%; 
margin-left: -150px;
margin-top: -150px;
`;

export class Venues extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            venue_data:[],
            coordinates:[],
            loading: true,
            centered_lat: '', 
            centered_long: ''
        };

    }  

    async componentDidMount() {

        if(this.props.location.state.location === "NYC"){
            this.setState({centered_lat:'40.730610'});
            this.setState({centered_long:'-73.935242'});
        }
        else if(this.props.location.state.location === "DC"){
            this.setState({centered_lat:'38.9072'});
            this.setState({centered_long:'-77.0369'});
        }
        else if(this.props.location.state.location === "LA"){
            this.setState({centered_lat:'34.0522'});
            this.setState({centered_long:'-118.2437'});
        }

        let venues = [];
        let coor = [];

        let venuesRef = db.collection('venues')
        let locationRef = await venuesRef.where('location', '==', this.props.location.state.location).orderBy('name').get();
        for (const venue of locationRef.docs){
            let name = venue.get('name');
            let location = venue.get('location');
            let maxcap = venue.get('maxcap');
            let cuisines = venue.get('cuisines');
            let lat = venue.get('address').latitude;
            let long = venue.get('address').longitude;
            venues.push({
                id: venue.id,
                n: name,
                loc: location,
                cap: maxcap,
                food_type: cuisines
            });

            coor.push({
                id: venue.id,
                latitude: lat,
                longitude: long
            });
            
        }
        this.setState({venue_data: venues});
        this.setState({coordinates: coor});
        console.log(this.state.coordinates)

        this.setState({loading: false});
      }
       

    

    render(){
        if(this.state.loading == true){
            console.log('loading');
            return (
                <LoadingSection>
                    <Alert variant='light'>
                    <Spinner animation="border" variant="info" />
                    <h4>Searching for available venues...</h4>
                    </Alert>
                </LoadingSection>
            );
        }
        else if(this.state.loading == false){
            console.log('loaded');
            return (
                <Wrapper>
                      <Row>
                        <Col md='6'>
                            <MapSection>
                            <MapView centered_lat = {this.state.centered_lat} centered_long = {this.state.centered_long} coordinateData = {this.state.coordinates}/>
                            </MapSection>
                        </Col>

                        <Col>
                        <Container className="overflow-auto">
                          <VenueSection>
                            <CardDeck>
                                <Row className='p-6'>
                                {this.state.venue_data.map((venue,index) => (
                                    <Col md="6">
                                    <br />
                                <Card className = "shadow p-3 mb-5 bg-white rounded" key = {venue.id} style={{width: '18rem' }}>
                                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2767&q=80" />
                                    <Card.Body>
                                    <Card.Title>{venue.n}</Card.Title>
                                    <Card.Text className= "shadow-none p-3 mb-5 bg-light rounded">
                                        <ul className="list-unstyled">
                                        <li><span><Icons.GeoAlt /></span><small> {venue.loc}</small></li>
                                        <li><span><Icons.PeopleFill/></span><small> {venue.cap} person max</small></li>
                                        <li><span><Icons.EggFried/></span><small> {venue.food_type.map((food, x) => (<Badge className="mr-1" variant="dark">{food}</Badge>))}</small></li>
                                        </ul>
                                    </Card.Text>
                                        <Button variant="primary">Plan Your Luau</Button>
                                       
                                    </Card.Body>
                                </Card>
                                </Col>
                            ))}
                            </Row>
                            </CardDeck>
                            </VenueSection>
                            </Container>
                        </Col>
                        </Row>
                </Wrapper>
                                );
        }
        }
}

