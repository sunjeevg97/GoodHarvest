import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapView extends React.Component{
    constructor(props){
        super(props);

    }  

    render(){
            return (
                <div>
                    <Map style={{ width: '100%', height: '50%' }} google={this.props.google} zoom={14}>
 
                        <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

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