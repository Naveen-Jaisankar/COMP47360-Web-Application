import {useState } from 'react';
import {APIProvider, Map, MapControl, ControlPosition, useMap} from '@vis.gl/react-google-maps';
import { IconButton } from '@mui/material';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';


import data from '../components/sampleheatdata'

// resources used:
// https://www.youtube.com/watch?v=PfZ4oLftItk&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN
// https://blog.victorwilliams.me/how-to-add-google-maps-to-react-app-visgl

const googleMapsKey= import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const mapId = import.meta.env.VITE_GOOGLE_MAPS_ID;


const position = { lat: 40.7831, lng: -73.9712 };

export default function MapPage () {

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isMapSidebarOpen, setIsMapSidebarOpen] = useState(false);

    const handleToggleSidebar = ()=>{
        setIsMapSidebarOpen(!isMapSidebarOpen);
    };
    
    const layers = [
        new HeatmapLayer({
            id: 'heatmap-layer',
            data: data,
            getPosition:d => [d[0], d[1]],
            getWeight: d => d[2],
            radiusPixels: 30,
            intensity: 1,
            threshold: 0.03,
            colorRange: [
              [1, 152, 189, 0],
              [73, 227, 206, 1],
              [216, 254, 181, 1],
              [254, 237, 177, 1],
              [254, 173, 84, 1],
              [209, 55, 78, 1]
            ],
        })
    ];

    return (
        <>
            <APIProvider apiKey={googleMapsKey}>
                <div className="flex h-screen">
                    <MapSidebar isOpen = {isMapSidebarOpen}/>
                    <div style={{width: '100vw', height: '100vh'}} className={`flex-1 ${!isMapSidebarOpen ? 'ml-0' : 'ml-0 md:ml-[20vw]'}`}>
                        <Map defaultZoom={13} defaultCenter={position} gestureHandling={'greedy'} disableDefaultUI={true} mapId={mapId}>
                            <MapOverlay layers= {layers}/>
                            <MapControl position={ControlPosition.TOP_LEFT}>
                                <div className='flex flex-row mx-2 p-2'>
                                    <IconButton onClick={handleToggleSidebar} className='bg-teal-500'>
                                        {isMapSidebarOpen ?<ArrowBackIosRoundedIcon/>:<ArrowForwardIosRoundedIcon/>}
                                    </IconButton>
                                    <PlaceAutocompleteInput setSelectedPlace = {setSelectedPlace} />
                                </div>
                            </MapControl>
                        </Map>
                        <MapHandler selectedPlace={selectedPlace} />
                    </div>
                </div>
            </APIProvider>
        </>
    )
}

//two major issues: 1.) Location search bar getting hidden by navbar
//2.) sidebar getting hidden underneath the map
//3.) Heatmap not showing