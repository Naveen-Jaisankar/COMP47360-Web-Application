import React, {useRef, useEffect, useState} from 'react';
import {useMapsLibrary} from '@vis.gl/react-google-maps';

export const PlaceAutocompleteInput = ({setSelectedPlace}) =>{
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary('places');

    //this useEffect takes care of the input and keeps track of changes in it
    useEffect(()=>{
        //checking if there is any input element and if the places API is active or not
        if(!places || !inputRef.current)
            return;

        const options = {
            fields: ['geometry', 'name', 'formatted_address']
            };
        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places])

    //this useEffect takes care of the location shown on basis of search
    useEffect(()=>{
        if(!placeAutocomplete)
            return;

        placeAutocomplete.addListener('place_changed', ()=>{
            setSelectedPlace(placeAutocomplete.getPlace());
        });
    }, [setSelectedPlace,placeAutocomplete]);

    return(
        <div className='w-[300px] bg-lightgrey cursor-pointer p-2'>
            <input ref={inputRef} className='w-full h-8 px-3 text-xl box-border'/>
        </div>
    )
};
