import React, {useState} from 'react';
import Component from 'react';

export class Menu extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            venue_data: this.props.location.state.venue_data
        }
        console.log(this.state.venue_data);
    }

    


    render(){
        return(
            <p> Menu page</p>
        );
    }
}