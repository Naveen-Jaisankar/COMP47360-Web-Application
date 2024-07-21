import { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleMap, HeatmapLayer, useJsApiLoader, Marker } from '@react-google-maps/api';

import PlaceAutocomplete from '../components/mapautocomplete';
import axiosInstance from '../axios';
import mapstyle from '../components/mapstyles';
import { MapSidebar } from '../components/mapsidebar';
import MapAlertCard from '../components/mapalertcard';
import Legend from '../components/maplegend';
import { heatData } from './heatdata';

const centerPosition = { lat: 40.773631, lng: -73.971290 };
const googleMapsKey = "AIzaSyBa8lmVjO0jiQvLJKR6twQ5jbila4wR3Tg";
const libs = ['visualization', 'places'];


let predictedData = [];
let aqiForLocation = 100;

export default function MapPage() {
  const [map, setMap] = useState(null);
  const [markerPos, setMarkerPos] = useState(centerPosition);
  const [isMapSidebarOpen, setIsMapSidebarOpen] = useState(false);
  const [shouldRenderMarker, setShouldRenderMarker] = useState(false);
  const [shouldRenderHeatMap, setShouldRenderHeatMap] = useState(false);
  const [heatMapData, setHeatMapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(0);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsKey,
    libraries: libs
  });

  const airQualityGradient = [
    "rgba(32, 205, 50, 0)",
    "rgba(0, 228, 0, 1)",
    "rgba(255, 255, 0, 1)",
    "rgba(255, 126, 0, 1)",
    "rgba(255, 0, 0, 1)",
    "rgba(143, 63, 151, 1)",
    "rgba(126, 0, 35, 1)",
  ];

  const GetheatData = (predictedData) => {
    const newHeatMapData = predictedData.flatMap(result => {
      var wt = 0.3;
      if (2 * result.predicted_aqi <= 50) wt = 0.05;
      else if (2 * result.predicted_aqi <= 100) wt = 0.1;
      else if (2 * result.predicted_aqi <= 150) wt = 0.15;
      else if (2 * result.predicted_aqi <= 200) wt = 0.2;
      else if (2 * result.predicted_aqi <= 300) wt = 0.25;
  
      return [
        // { lat: result.max_lat, lng: result.max_lon, weight: wt },
        // { lat: result.max_lat, lng: result.min_lon, weight: wt },
        // { lat: result.min_lat, lng: result.max_lon, weight: wt },
        // { lat: result.min_lat, lng: result.min_lon, weight: wt },
        { lat: (result.max_lat + result.min_lat) / 2, lng: (result.max_lon + result.min_lon) / 2, weight: wt },
        // {lat: (result.max_lat + result.min_lat) / 2, lng: result.max_lon, weight: wt},
        // {lat: (result.max_lat + result.min_lat) / 2, lng: result.min_lon, weight: wt},
        // {lat: result.max_lat, lng: (result.max_lon + result.min_lon) / 2, weight: wt },
        // {lat: result.min_lat, lng: (result.max_lon + result.min_lon) / 2, weight: wt },
      ];
    });
    return newHeatMapData;
  }

  const fetchAQIData = useCallback(async () => {
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

    try {
      const response = await axiosInstance.post('/map/getAllAQIValues', locationInput);
      if(response.data.length > 0)
      {
        predictedData = response.data;
        const newHeatMapData = GetheatData(predictedData);
        setHeatMapData(newHeatMapData);
        console.log("Location data sent successfully!", response);
        setLoading(false);
        setLastFetchTime(Date.now());
      }
      else
      {
        predictedData = heatData;
        setHeatMapData(GetheatData(predictedData))
        setLoading(false);
        setLastFetchTime(Date.now());
      }
    } catch (error) {
      console.error("There was an error sending the location data!", error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAQIData();
    const interval = setInterval(() => {
      fetchAQIData();
    }, 1000);
    return () => clearInterval(interval);
  }, [fetchAQIData]);

  const GetAqiForLocation = (loc) => {
    for (const datapoint of predictedData) {
      if (loc.lat >= datapoint.min_lat && loc.lat <= datapoint.max_lat && loc.lng <= datapoint.max_lon && loc.lng >= datapoint.min_lon) {
        return datapoint.predicted_aqi;
      }
    }
    return 0;
  };

  const handlePlaceSelected = useCallback((location) => {
    if (map) {
      map.panTo(new google.maps.LatLng(location.lat(), location.lng()));
      map.zoom = 13;
      setMarkerPos({ lat: location.lat(), lng: location.lng() });
      aqiForLocation = GetAqiForLocation({ lat: location.lat(), lng: location.lng() });
    }
  }, [map]);

  const mapContainerStyle = useMemo(() => ({
    position: 'relative',
    width:'100vw',
    height: '100vh'
  }), [isMapSidebarOpen]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRenderMarker(true);
      setShouldRenderHeatMap(true);
    }, 1000);
    return () => clearTimeout(timer);
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

      <GoogleMap
        mapContainerStyle={mapContainerStyle} center={centerPosition} zoom={11.7} onLoad={(map) => setMap(map)}
        options={{
          disableDefaultUI: {
            zoomControl: true,
            mapTypeControl: true,
            streetViewControl: true,
          },
          styles: mapstyle,
          gestureHandling: 'none',
          zoomControl:true // Add this line to prevent zooming
        }}
      >
          {map && !loading && heatMapData.length > 0 && shouldRenderHeatMap &&
            <HeatmapLayer
              data={heatMapData.map((data) => (
                { location: new google.maps.LatLng(data.lat, data.lng), weight: data.weight }
              ))}
              options={{radius: 20, dissipating: true, opacity: 0.2, gradient: airQualityGradient}}
            />
          }

          {shouldRenderMarker && <Marker position={{ lat: markerPos.lat, lng: markerPos.lng }} />}

          <div className='flex flex-col fixed ml-3 z-10 gap-2 top-12 mt-6'>
            <div className='flex flex-row items-center ml-3 p-2'>
              <PlaceAutocomplete onPlaceSelected={handlePlaceSelected} />
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
