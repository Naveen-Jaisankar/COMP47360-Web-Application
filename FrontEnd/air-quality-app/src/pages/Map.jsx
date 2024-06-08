import {Map,
        APIProvider,
        AdvancedMarker,
        Pin,
        InfoWindow,
} from "@vis.gl/react-google-maps"

// resources used:
// https://www.youtube.com/watch?v=PfZ4oLftItk&list=PL2rFahu9sLJ2QuJaKKYDaJp0YqjFCDCtN
// https://blog.victorwilliams.me/how-to-add-google-maps-to-react-app-visgl

const googleMapsKey= import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const position = { lat: 40.7831, lng: -73.9712 };
const customMapId = import.meta.env.VITE_GOOGLE_MAPS_ID;

export default function MapPage () {
    return (
        <>
        <APIProvider apiKey={googleMapsKey}>
        <div>
            <Map
            style={{width: '100vw', height: '90vh'}}
            defaultZoom={13}
            defaultCenter={position}
            gestureHandling={'greedy'}
            // disableDefaultUI={true}
            mapId={customMapId}></Map>

        </div>
        
        
        </APIProvider>

        </>
    )
}