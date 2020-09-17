import React, { Component } from 'react';
import Select from 'react-select';
import InputGroup from 'react-bootstrap/InputGroup';


export class TimePicker extends Component{
    constructor(props) {
        super(props);
        this.state = {time: '8:00AM', location:'', name:''};
    
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event) {
        this.setState({time: event.target.value});
      }
      

      render() {
        let x = 30; //minutes interval
        let times = []; // time array
        let tt = 0; // start time
        let ap = ['AM', 'PM']; // AM-PM
        
        //loop to increment the time and push results in array
        for (let i=0;tt<24*60; i++) {
          let hh = Math.floor(tt/60); // getting hours of day in 0-24 format
          let mm = (tt%60); // getting minutes of the hour in 0-55 format
          times[i] = ("" + ((hh==12)?12:hh%12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh/12)];
          tt = tt + x;
        }
        
         let timeList = times.map(v => ({
            label: v,
            value: v
         }));

         console.log(timeList);
        return (
                <select className="custom-select" id="timeSelect" value={this.state.value} onChange={this.handleChange}>
                    {timeList.map((time) => <option value={time.value}>{time.label}</option>)}
                </select>
        );
      }
}