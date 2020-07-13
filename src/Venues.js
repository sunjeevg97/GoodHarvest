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
            venues.push({
                id: venue.id,
                n: name,
                loc: location,
                cap: maxcap
            });

            this.setState({venue_data: venues});
        }

        console.log(this.state.venue_data);
      }
       

    

    render(){
       console.log(this.state.venue_data);
            return (
                <div>
                    <Container fluid >
                        <Row>
                        
                                <MapView />
                        </Row>

                        <Row>
                        <Col>
                        <CardDeck>
                        {this.state.venue_data.map((venue,index) => (

                            <Card key = {venue.id} border = "primary" style={{ width: '18rem' }}>
                                <Card.Img variant="top" src="holder.js/100px180" />
                                <Card.Body>
                                <Card.Title>{venue.n}</Card.Title>
                                <Card.Text>
                                    Location: {venue.loc}
                                    Max Capacity: {venue.cap}
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        ))}
                        </CardDeck>
                        </Col>
                    </Row>
                    </Container>
                </div>);
        }
}

