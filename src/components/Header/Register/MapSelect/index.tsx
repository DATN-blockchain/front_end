import React, { useState } from 'react';

import MapPicker from 'react-google-map-picker';

const DefaultLocation = { lat: 16.03288021688626, lng: 108.21836498627808 };
const DefaultZoom = 8;
export default function MapSelect() {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat: any, lng: any) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom: any) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }
  return (
    <div>
      <button onClick={handleResetLocation}>Reset Location</button>
      <label>Latitute:</label>
      <input type="text" value={location.lat} disabled />
      <label>Longitute:</label>
      <input type="text" value={location.lng} disabled />
      <label>Zoom:</label>
      <input type="text" value={zoom} disabled />
      {/* <div className="w-[500px]"> */}
        <MapPicker
          defaultLocation={defaultLocation}
          zoom={zoom}
          //   mapTypeId='roadmap'
          style={{ height: '300px',borderRadius:'5px', width:'500px' }}
          onChangeLocation={handleChangeLocation}
          onChangeZoom={handleChangeZoom}
          apiKey="AIzaSyDaOulQACiJzBfqumbsqg_-vKha8fCnL-s"
        />
      {/* </div> */}
    </div>
  );
}
