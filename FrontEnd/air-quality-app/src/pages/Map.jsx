/*global google*/
import { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleMap, HeatmapLayer, useJsApiLoader, Marker } from '@react-google-maps/api';
// import { IconButton } from '@mui/material';
// import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
// import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import PlaceAutocomplete from '../components/mapautocomplete';
import axiosInstance from '../axios';
import mapstyle from '../components/mapstyles';
import { MapSidebar } from '../components/mapsidebar';
import MapAlertCard from '../components/mapalertcard';
import Legend from '../components/maplegend';
import { heatData } from './heatdata';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

let predictedData = [];
let aqiForLocation = 100;


export default function MapPage() {
  const [map, setMap] = useState(null);
  const [markerPos, setMarkerPos] = useState(centerPosition);
  const [isMapSidebarOpen, setIsMapSidebarOpen] = useState(false);
  const [shouldRenderMarker, setShouldRenderMarker] = useState(false); // Variable to control when the marker will be loaded in.
  const [shouldRenderHeatMap, setShouldRenderHeatMap] = useState(false); // Variable to control when the heatmap will be loaded in.
  const [heatMapData, setHeatMapData] = useState(null); // Move heatMapData to state
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [lastFetchTime, setLastFetchTime] = useState(0); // State to store the last fetch time
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsKey,
    libraries: libs
  });

  const GetheatData = () =>{
    const newHeatMapData = predictedData.map(result => {
      let wt = 6;
      if (result.predicted_aqi <= 50) wt = 1;
      else if (result.predicted_aqi <= 100) wt = 2;
      else if (result.predicted_aqi <= 150) wt = 3;
      else if (result.predicted_aqi <= 200) wt = 4;
      else if (result.predicted_aqi <= 300) wt = 5;

      return { lat: (result.max_lat + result.min_lat) / 2, lng: (result.max_lon + result.min_lon) / 2, weight: wt };
    });

    return newHeatMapData;
  }

  const fetchAQIData = useCallback(async () => {
    const locationInput = {
      time_stamp: Math.floor(Date.now() / 1000),
    };

    try {
      const response = await axiosInstance.post('/map/getAllAQIValues', locationInput);
      if(response.data.length > 0)
      {
        predictedData = response.data;
        const newHeatMapData = response.data.map(result => {
          let wt = 6;
          if (result.predicted_aqi <= 50) wt = 1;
          else if (result.predicted_aqi <= 100) wt = 2;
          else if (result.predicted_aqi <= 150) wt = 3;
          else if (result.predicted_aqi <= 200) wt = 4;
          else if (result.predicted_aqi <= 300) wt = 5;
  
          return { lat: (result.max_lat + result.min_lat) / 2, lng: (result.max_lon + result.min_lon) / 2, weight: wt };
        });
        setHeatMapData(newHeatMapData);
        console.log("Location data sent successfully!", response);
        setLoading(false); // Set loading to false once data is fetched
        setLastFetchTime(Date.now()); // Update the last fetch time
      }
      else
      {
        predictedData = heatData;
        setHeatMapData(GetheatData())
        setLoading(false); // Set loading to false once data is fetched
        setLastFetchTime(Date.now()); // Update the last fetch time
      }
    } catch (error) {
      console.error("There was an error sending the location data!", error);
      setLoading(false); // Set loading to false in case of an error
    }
  }, []);

  

  useEffect(() => {
    // Fetch data immediately
    fetchAQIData();

    
    const interval = setInterval(() => {
      fetchAQIData();
    }, 1800000); // 

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [fetchAQIData]);

  const GetAqiForLocation = (loc, date) => {
    // Use the date parameter to filter or fetch data accordingly
    console.log(loc)
    const data = {
      loc_lat: loc.lat,
      loc_lon: loc.lng,
      time_stamp: Math.floor(date.getTime() / 1000)
    };

    axiosInstance.post('/map/getAQIValueForALocation', data)
      .then(response => {
        console.log(response.data.predicted_aqi);
        return response.predicted_aqi;
      })
      .catch(error => {
        console.error("There was an error sending the data!", error);
    });

    return 0;
  };

  const handlePlaceSelected = useCallback((location) => {
    if (map) {
      map.panTo(new google.maps.LatLng(location.lat(), location.lng()));
      map.zoom = 14;
      setMarkerPos({ lat: location.lat(), lng: location.lng() });
      aqiForLocation = GetAqiForLocation({ lat: location.lat(), lng: location.lng() }, selectedDate);
    }
  }, [map, selectedDate]);

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
      setShouldRenderHeatMap(true);
    }, 1000); // Adjust the delay time here as needed
    return () => clearTimeout(timer); // Clears out the delay for future marker rendering
  }, []);

  if (!isLoaded) {
    return (<div>Loading...please wait</div>);
  }

  const formatLastFetchTime = (timestamp) => {
    if (timestamp === 0) return "Never";
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <MapSidebar isOpen={isMapSidebarOpen} />
      <div style={{ width: '100vw', height: '100vh' }} className='flex-1 ml-0'>
        <GoogleMap mapContainerStyle={mapContainerStyle}
          center={centerPosition} zoom={12} onLoad={(map) => setMap(map)}
          options={{ disableDefaultUI: { zoomControl: true, mapTypeControl: true, streetViewControl: true }, styles: mapstyle }}>

          {map && !loading && heatMapData.length> 0 && shouldRenderHeatMap &&
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
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy/MM/dd"
                className="ml-2 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <MapAlertCard aqi={aqiForLocation} />

            <div className="text-sm mt-2">
              Last fetch time: {formatLastFetchTime(lastFetchTime)}
            </div>
          </div>

          <div className='flex fixed z-10 right-2 mr-3 bottom-4'>
            <Legend />
          </div>
        </GoogleMap>
      </div>
    </div>
  );
}