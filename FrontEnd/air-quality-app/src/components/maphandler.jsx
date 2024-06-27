import React, {useMemo, useEffect} from 'react'
import {useMap} from '@vis.gl/react-google-maps';

const MapHandler = ({selectedPlace}) =>{
    const map = useMap();

    useEffect(() => {
      if (!map || !selectedPlace) return;
  
      if (selectedPlace.geometry?.viewport) {
        map.fitBounds(selectedPlace.geometry?.viewport);
      }
    }, [map, selectedPlace]);
  
    return null;
};

export default React.memo(MapHandler);