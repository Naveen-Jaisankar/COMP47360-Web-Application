import { useMap } from '@vis.gl/react-google-maps';
import { useEffect, useMemo } from 'react';

import { GoogleMapsOverlay } from '@deck.gl/google-maps';

//resources
//https://github.dev/visgl/react-google-maps/blob/main/examples/deckgl-overlay/src/deckgl-overlay.ts
//https://github.com/visgl/deck.gl/blob/9.0-release/examples/website/heatmap/app.tsx

export const MapOverlay = ({ layers }) => {
    const map = useMap();
  const deck = useMemo(() => new GoogleMapsOverlay({ layers }), []);

  useEffect(() => {
    if (map) {
      deck.setMap(map);
    }
    // return () => deck.setMap(null);
  }, [deck, map]);

  useEffect(() => {
      deck.setProps({ layers });
  }, [deck, layers]);

  return null;
};