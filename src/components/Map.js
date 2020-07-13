import React from 'react';

import GoogleMapReact from "google-map-react";


const points = [
    { id: 1, title: "Round Pond", lat: 51.506, lng: -0.184 },
    { id: 2, title: "The Long Water", lat: 51.508, lng: -0.175 },
    { id: 3, title: "The Serpentine", lat: 51.505, lng: -0.164 }
]

const Marker = ({ text, tooltip }) => (
    <div className="circle">
      <span className="circleText" title={tooltip}>
        {text}
      </span>
    </div>
  );

export default function Map() {
    return(
        <div className="Map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCLrqjgyJv-oaX0Q1Lbkg18apa_Urltea0",
          language: "en",
          region: "US"
        }}
        defaultCenter={{ lat: 51.506, lng: -0.169 }}
        defaultZoom={15}
      >
        {points.map(({ lat, lng, id, title }) => {
          return (
            <Marker
              key={id}
              lat={lat}
              lng={lng}
              text={id}
              tooltip={title}
            />
          );
        })}
      </GoogleMapReact>
    </div>
    )
}