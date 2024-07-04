import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, HeatmapLayer, useJsApiLoader } from '@react-google-maps/api';
import axiosInstance from './../axios'

import PlaceAutomplete from '../components/mapautocomplete';

// resources used:
//https://youtu.be/Y7tpjR2dLOQ?si=Elw_hGiTmzay0xuf

// const googleMapsKey= import.meta.env.VITE_GOOGLE_MAPS_API_KEY
// const customMapId = import.meta.env.VITE_GOOGLE_MAPS_ID;

const centerPosition = { lat: 40.773631, lng: -73.971290 };

const googleMapsKey = "AIzaSyBa8lmVjO0jiQvLJKR6twQ5jbila4wR3Tg";
const libs = ['visualization', 'places']

//dummy data
const heatMapData = [
    { lat: 40.7128, lng:-74.0060, weight:2 },
    { lat: 40.758896, lng: -73.985130, weight:5 },
    { lat: 40.813819, lng: -73.949219, weight:1 },
    { lat: 40.693619, lng: -74.009215, weight:3 },
    { lat: 40.879352, lng: -73.923219, weight:3 },
    { lat: 40.725819, lng: -73.996130, weight:2 },
    { lat: 40.748352, lng: -74.004215, weight:1 },
    { lat: 40.819352, lng: -73.944219, weight:6 },
    { lat: 40.695819, lng: -74.013130, weight:4 },
    { lat: 40.763352, lng: -73.983219, weight:3 },
    { lat: 40.739352, lng: -73.969219, weight:2 },
    { lat: 40.799352, lng: -73.929219, weight:1 },
    { lat: 40.729352, lng: -73.989219, weight:1.5 },
    { lat: 40.769352, lng: -73.959219, weight:4 },
    { lat: 40.789352, lng: -73.939219, weight:2 },
    { lat: 40.749352, lng: -73.979219, weight:3 },
    { lat: 40.809352, lng: -73.909219, weight:5 },
    { lat: 40.719352, lng: -74.019219, weight:1},
    { lat: 40.779352, lng: -73.949219, weight:2.5 },
    { lat: 40.759352, lng: -73.969219, weight:1 },
    { lat: 40.829352, lng: -73.919219, weight:5 },
] 

const airQualityGradient = [
    "rgba(32, 205, 50, 0)", // Good air quality
    "rgba(32, 205, 50, 1)", // Good air quality
    "rgba(255, 255, 0, 1)", // Moderate air quality
    "rgba(255, 160, 122, 1)", // Unhealthy for sensitive groups
    "rgba(255, 0, 0, 1)", // Unhealthy
    "rgba(139, 10, 26, 1)", // Very unhealthy
    "rgba(108, 92, 231, 1)", // Hazardous
  ];

export default function MapPage() {
    const [map, setMap] = useState(null);
    const [heatMapData, setHeatMapData] = useState([]);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsKey,
        libraries: libs
    });

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

        axiosInstance.post('/map/getAllAQIValues', locationInput)
            .then(response => {
                console.log("Location data sent successfully!", response);
            })
            .catch(error => {
                console.error("There was an error sending the location data!", error);
            });
    }, []);

    const handlePlaceSelected = useCallback((location) => {
        if (map) {
          map.panTo(new google.maps.LatLng(location.lat(), location.lng()));
          map.zoom = 12;
        }
      }, [map]);

    if(!isLoaded)
    {
        return(<div>Loading...please wait</div>)
    }

    return (
        <div>
            <GoogleMap mapContainerStyle={{ position: 'relative', width: '100vw', height: '100vh' }}
                center={centerPosition} zoom={12} onLoad={(map) => setMap(map)}
                options={{ disableDefaultUI: { zoomControl: true, mapTypeControl: true, streetViewControl: true } }}>
                
                {map && heatMapData.length > 0 &&
                    <>
                        <HeatmapLayer
                            data={heatMapData.map((data) => (
                                { location: new google.maps.LatLng(data.lat, data.lng), weight: data.weight }
                            ))}
                            options={{ radius: 20, dissipating: true, opacity: 0.2, gradient: airQualityGradient }}
                        />
                    </>
                }
                <div>
                    <PlaceAutomplete onPlaceSelected = {handlePlaceSelected}/>
                </div>
            </GoogleMap>
        </div>
    )
}