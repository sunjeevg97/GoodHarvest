import React, {useState} from 'react';
import Component from 'react';
import { db } from './firebase';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
export class Venues extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            venues: []
        };

    }  

    async componentDidMount() {
        let venuesRef = db.collection('venues')
        let locationRef = await venuesRef.where('location', '==', this.props.location.state.location).get();
        for (const venue of locationRef.docs){
            let name = venue.get('name');
            let location = venue.get('location');
            let maxcap = venue.get('maxcap');
            this.state.venues[venue.id] = [name, location, maxcap];
        }
      }
       

    

    render(){
       console.log(this.state.venues);
        for(const v of this.state.venues){
            return(
                <div>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
    }
}
