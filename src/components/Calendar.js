import React, { useState } from "react";
import Component from 'react';
import Calendar from 'react-calendar';

export class ReactCalendar extends Component {


    constructor(props){
        super(props);

        state = {date: new Date()};
    }

    
    handleChange = date => {
        this.setState({ date });
        console.log(date);
}


    render(){
    return(
        <div>
            <Calendar onChange={this.handleChange} value={this.state.date} />
            {console.log(this.state.date)}
        </div>
    );
    }
};