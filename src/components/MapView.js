import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapView extends React.Component{

    constructor(props){
        super(props);
        this.state = ({
            markers: []
        });
        
    }
    
    componentDidMount(){
        this.setState({markers:this.props.coordinateData})
        console.log(this.props.coordinateData);
        console.log(this.state.markers);
    }

    render(){
            return (
                <div>
                    <Map google={this.props.google} zoom={12} center= {{lat: this.props.centered_lat, lng: this.props.centered_long}}>
 
                    { this.props.coordinateData.map(geopoint =>
                            <Marker
                                key={geopoint.id}
                                position={{ lat: geopoint.latitude, lng: geopoint.longitude }}
                            />
                        )} 

                    <InfoWindow onClose={this.onInfoWindowClose}>
                     <div>
                    </div>
                    </InfoWindow>
                    </Map>
                </div>);
        }
}
export default GoogleApiWrapper({
    apiKey: ('AIzaSyDaxFRunv-iE3TkLSELjDORRaZJAyeJA6k')
  })(MapView)