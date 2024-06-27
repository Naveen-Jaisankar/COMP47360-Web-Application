import React, {useState, useEffect} from 'react';
import {APIProvider, Map, MapControl, ControlPosition} from '@vis.gl/react-google-maps';

import {PlaceAutocompleteInput} from '../components/mapautocomplete';
import MapHandler from '../components/maphandler';

// resources used:
// https://www.youtube.com/watch?v=PfZ4oLftItk&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN
// https://blog.victorwilliams.me/how-to-add-google-maps-to-react-app-visgl

// const googleMapsKey= import.meta.env.VITE_GOOGLE_MAPS_API_KEY
// const customMapId = import.meta.env.VITE_GOOGLE_MAPS_ID;


const position = { lat: 40.7831, lng: -73.9712 };

const googleMapsKey = 'AIzaSyBa8lmVjO0jiQvLJKR6twQ5jbila4wR3Tg';
const mapId = '607085023c1c5ce3';

export default function MapPage () {

    const [selectedPlace, setSelectedPlace] = useState(null);
    
    return (
        <>
            <APIProvider apiKey={googleMapsKey}>
                <div style={{width: '100vw', height: '100vh'}}>
                
                    <Map defaultZoom={13} defaultCenter={position}
                    gestureHandling={'greedy'} disableDefaultUI={true} mapId={mapId}>

                        <MapControl position={ControlPosition.LEFT_TOP}>
                            <div className='flex flex-row mx-2 p-2'>
                                <button className='bg-teal-500'>Click Me</button>
                                <PlaceAutocompleteInput setSelectedPlace = {setSelectedPlace} />
                            </div>
                        </MapControl>
                    </Map>

                    <MapHandler selectedPlace={selectedPlace} />
                </div>
            </APIProvider>
        </>
    )
}