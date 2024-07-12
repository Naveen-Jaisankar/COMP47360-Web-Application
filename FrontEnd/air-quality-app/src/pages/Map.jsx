/*global google*/
import { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleMap, HeatmapLayer, useJsApiLoader, Marker } from '@react-google-maps/api';
// import { IconButton } from '@mui/material';
// import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
// import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import PlaceAutocomplete from '../components/mapautocomplete';
import axiosInstance from './../axios';
import mapstyle from '../components/mapstyles';
import { MapSidebar } from '../components/mapsidebar';
import MapAlertCard from '../components/mapalertcard';
import Legend from '../components/maplegend';

// const warningImg = "../src/static/icons8-warning-96.png";
const centerPosition = { lat: 40.773631, lng: -73.971290 };
const googleMapsKey = "AIzaSyBa8lmVjO0jiQvLJKR6twQ5jbila4wR3Tg";
const libs = ['visualization', 'places'];
const airQualityGradient = [
  "rgba(32, 205, 50, 0)",
  "rgba(0, 228, 0, 1)",
  "rgba(255, 255, 0, 1)",
  "rgba(255, 126, 0, 1)",
  "rgba(255, 0, 0, 1)",
  "rgba(143, 63, 151, 1)",
  "rgba(126, 0, 35, 1)",
];

const heatMapData = [];
let predictedData = [];
let aqiForLocation = 100;

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [markerPos, setMarkerPos] = useState(centerPosition);
  const [isMapSidebarOpen, setIsMapSidebarOpen] = useState(false);
  const [lastRun, setLastRun] = useState(Date.now());
  const [shouldRenderMarker, setShouldRenderMarker] = useState(false); // Variable to control when the marker will be loaded in.

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsKey,
    libraries: libs
  });

  // useEffect(() => {
  //   console.log("Marker position updated:", markerPos);
  // }, [markerPos]);

  useEffect(() => {
    const locationInput = {
      loc_lat: 40.75838928128043,
      loc_lon: -73.97503124048248,
      time_stamp: 1780310800,
      humidity: 62,
      wind_deg: 259,
      temp: 286.59444444444443,
      wind_speed: 5.4704,
      wind_gust: 0.0,
      pressure: 1009.482859,
      weather_id: 502
    };

    const now = Date.now();
    if (now - lastRun >= 3600000) {
      axiosInstance.post('/map/getAllAQIValues', locationInput)
        .then(response => {
          predictedData = response;
          response.forEach(result => {
            let wt = 6;
            if (result.predicted_aqi <= 50) wt = 1;
            else if (result.predicted_aqi <= 100) wt = 2;
            else if (result.predicted_aqi <= 150) wt = 3;
            else if (result.predicted_aqi <= 200) wt = 4;
            else if (result.predicted_aqi <= 300) wt = 5;

            heatMapData.push({ lat: (result.max_lat + result.min_lat) / 2, lng: (result.max_lon + result.min_lon) / 2, weight: wt });
          });
          console.log("Location data sent successfully!", response);
        })
        .catch(error => {
          console.error("There was an error sending the location data!", error);
        });
      setLastRun(now);
    }
  }, [lastRun]);

  // This function calculates the aqi for a location based on search
  const GetAqiForLocation = (loc) =>{
    predictedData.forEach(datapoint =>{
        if(loc.lat >= datapoint.min_lat && loc.lat <= datapoint.max_lat && loc.lng <= datapoint.max_lon && loc.lng >= datapoint.min_lon)
            return datapoint.predicted_aqi;
    });
    return 0;
  };

  const handlePlaceSelected = useCallback((location) => {
    if (map) {
      map.panTo(new google.maps.LatLng(location.lat(), location.lng()));
      map.zoom = 14;
      setMarkerPos({ lat: location.lat(), lng: location.lng() });
      aqiForLocation = GetAqiForLocation({ lat: location.lat(), lng: location.lng() })
    }
  }, [map]);

  const mapContainerStyle = useMemo(() => ({
    position: 'relative',
    // width: isMapSidebarOpen ? '80vw' : '100vw',
    width:'100vw',
    height: '100vh'
  }), [isMapSidebarOpen]);

  // const handleToggleSidebar = useCallback(() => {
  //   setIsMapSidebarOpen(prevState => !prevState);
  // }, []);

  useEffect(() => {
    // Set a delay of 1 second before rendering the marker for the first time (0.04 seconds lowest so far)
    const timer = setTimeout(() => {
      setShouldRenderMarker(true);
    }, 1000); // Adjust the delay time here as needed
    return () => clearTimeout(timer); // Clears out the delay for future marker rendering
  }, []);

  if (!isLoaded) {
    return (<div>Loading...please wait</div>);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <MapSidebar isOpen={isMapSidebarOpen} />
      <div style={{ width: '100vw', height: '100vh' }} className='flex-1 ml-0'>
        <GoogleMap mapContainerStyle={mapContainerStyle}
          center={centerPosition} zoom={12} onLoad={(map) => setMap(map)}
          options={{ disableDefaultUI: { zoomControl: true, mapTypeControl: true, streetViewControl: true }, styles: mapstyle }}>

          {map && heatMapData.length > 0 &&
            <HeatmapLayer
              data={heatMapData.map((data) => (
                { location: new google.maps.LatLng(data.lat, data.lng), weight: data.weight }
              ))}
              options={{ radius: 20, dissipating: true, opacity: 0.2, gradient: airQualityGradient }}
            />
          }

          {shouldRenderMarker && <Marker position={{ lat: markerPos.lat, lng: markerPos.lng }} />}

          <div className='flex flex-col fixed ml-3 z-10 gap-2 top-12 mt-6'>
            <div className='flex flex-row items-center ml-3 p-2'>
              {/* <IconButton onClick={handleToggleSidebar} className='font-bold'>
                {isMapSidebarOpen ? <ArrowBackIosRoundedIcon /> : <ArrowForwardIosRoundedIcon />}
              </IconButton> */}
              <PlaceAutocomplete onPlaceSelected={handlePlaceSelected} />
            </div>
            <MapAlertCard aqi={aqiForLocation} />

            {/* <div className='flex items-center justify-center bg-[#0D1B2A] text-white p-2 ml-3 rounded-lg'>
              <img src={warningImg} alt="Warning Icon" />
              <div className='break-words whitespace-normal'>
                <h2 className="font-bold text-lg">Air Quality Hazardous In This Area</h2>
                <p className="text-sm mt-1">AQI: 90-100</p>
                <p className="text-sm mt-1">Unhealthy for all groups.</p>
              </div> */}
            {/* </div> */}
          </div>

          <div className='flex fixed z-10 right-2 mr-3 bottom-4'>
            <Legend />
          </div>
        </GoogleMap>
      </div>
    </div>
  );
}
