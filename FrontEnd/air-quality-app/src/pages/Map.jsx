import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, HeatmapLayer, useJsApiLoader, Marker} from '@react-google-maps/api';

import { IconButton } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import PlaceAutomplete from '../components/mapautocomplete';
import axiosInstance from './../axios'
//to change the style of map just edit the mapstyles.js file
import mapstyle from '../components/mapstyles';
import { MapSidebar } from '../components/mapsidebar';

// resources used:
//https://youtu.be/Y7tpjR2dLOQ?si=Elw_hGiTmzay0xuf

const warningImg = "../src/static/icons8-warning-96.png";

const centerPosition = { lat: 40.773631, lng: -73.971290 };

const googleMapsKey = "AIzaSyBa8lmVjO0jiQvLJKR6twQ5jbila4wR3Tg";
const libs = ['visualization', 'places']

//to be used for heat map
const heatMapData = [];

//to be used for gettign aqi data based on searched location
let predictedData = [];

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
    // const [heatMapData, setHeatMapData] = useState([]);
    const [markerPos, setMarkerPos] = useState(centerPosition);
    const [isMapSidebarOpen, setIsMapSidebarOpen] = useState(false);
    const [lastRun, setLastRun] = useState(Date.now());

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: googleMapsKey,
        libraries: libs
    });

    useEffect(() => {

        // TODO: Get this data from openweather
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
        if(now - lastRun >= 3600000)
        {
            axiosInstance.post('/map/getAllAQIValues', locationInput)
            .then(response => {
                predictedData = response;
                response.forEach(result => {
                    let wt = 6;

                    if(result.predicted_aqi <= 20)
                    {
                        wt = 1;
                    }
                    else if(result.predicted_aqi <= 40 && result.predicted_aqi > 20)
                    {
                        wt = 2;
                    }
                    else if(result.predicted_aqi <= 60 && result.predicted_aqi > 40)
                    {
                        wt = 3;
                    }
                    else if(result.predicted_aqi <= 80 && result.predicted_aqi > 60)
                    {
                        wt = 4;
                    }
                    else if(result.predicted_aqi <= 100 && result.predicted_aqi > 80)
                    {
                        wt = 5;
                    }

                    heatMapData.push({lat:(result.max_lat + result.min_lat) / 2, lng:(result.max_lon + result.min_lon) / 2, weight:wt});

                });
                console.log("Location data sent successfully!", response);
            })
            .catch(error => {
                console.error("There was an error sending the location data!", error);
            });
            setLastRun(now);
        }

    }, [lastRun]);

    // TODO: add code to convert aqi data to location and weight

    const handlePlaceSelected = useCallback((location) => {
        if (map) {
          map.panTo(new google.maps.LatLng(location.lat(), location.lng()));
          map.zoom = 14;
          setMarkerPos({lat: location.lat(), lng: location.lng()});
        }
      }, [map]);


    if(!isLoaded)
    {
        return(<div>Loading...please wait</div>)
    }

    const handleToggleSidebar = ()=>{
        setIsMapSidebarOpen(!isMapSidebarOpen);
    };

    const onLoad = marker => {
        console.log('marker: ', marker)
        console.log(marker.position.lat());
      }

    return (
        <div className="flex h-screen">
            <MapSidebar isOpen = {isMapSidebarOpen}/>
            <div style={{width: '100vw', height: '100vh'}} className={`flex-1 ${!isMapSidebarOpen ? 'ml-0' : 'ml-0 md:ml-[20vw]'}`}>
                <GoogleMap mapContainerStyle={{position: 'relative', width: isMapSidebarOpen ? '80vw' : '100vw', height: '100vh'}}
                    center={centerPosition} zoom={12} onLoad={(map)=> setMap(map)}
                    options={{ disableDefaultUI:{zoomControl:true, mapTypeControl:true, streetViewControl:true,},styles:mapstyle}}>

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

                    <Marker onLoad = {onLoad} position={{lat: markerPos.lat, lng: markerPos.lng}} />

                    <div className='flex flex-col absolute ml-3 md:top-4 z-10 gap-4 xs:top-20'>   
                        {/* search bar and sidebar toggle button */}
                        <div className='flex flex-row items-center' >
                            <IconButton onClick={handleToggleSidebar} className='font-bold'>
                                {isMapSidebarOpen ?<ArrowBackIosRoundedIcon/>:<ArrowForwardIosRoundedIcon/>}
                            </IconButton>
                            <PlaceAutomplete onPlaceSelected = {handlePlaceSelected}/>
                        </div>

                        {/* Warning card */}
                        {/* TODO: Make the icon and the description change dynamically */}
                        <div className='flex items-center justify-center bg-[#0D1B2A] text-white p-2 ml-3 rounded-lg'>
                            <img src= {warningImg} alt="Warning Icon"/>
                            <div className=' break-words whitespace-normal'>
                                <h2 className="font-bold text-lg">Air Quality Hazardous In This Area</h2>
                                <p className="text-sm mt-1">AQI: 90-100</p>
                                <p className="text-sm mt-1">Unhealthy for all groups.</p>
                            </div>
                        </div>
                    </div>         
                </GoogleMap>
            </div>
        </div>
    )
}