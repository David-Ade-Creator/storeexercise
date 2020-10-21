import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import PlacesAutocomplete,{geocodeByAddress,getLatLng} from 'react-places-autocomplete';
import { useDispatch } from 'react-redux';
import { getsearchedstore } from '../redux/actions/storeaction';

export default function Homepage() {
  const [address, setAddress] = useState('');
  const [coordinates, setCordinates] = useState({lat:null,lng:null});

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setAddress(value)
    setCordinates(latlng);
  }

  const dispatch = useDispatch();

  const searchHandler = (e) => {
    e.preventDefault()
    dispatch(getsearchedstore(coordinates.lat,coordinates.lng))
  }


    return (
        <div className="homepage">
        
        <div className="homepage-searchsection">
        <div>
          <h4>Please enter store address to find store</h4>
        </div>
        <div className="homepage-content">
        <div>
          <PlacesAutocomplete
          value={address} 
          onChange={setAddress} 
          onSelect={handleSelect}>
            {({getInputProps,suggestions, getSuggestionItemProps, loading})=>(
              <div>
                <input className="searchinput" {...getInputProps({placeholder:"Enter store address"})} />
                 <div>
                  {loading ? <div>...loading...</div>: null}
                  {suggestions.map((suggestion)=> {
                    const style = {
                      backgroundColor: suggestion.active ? "red" : "white"
                    }
                   return (
                   <div {...getSuggestionItemProps(suggestion,{style})}>
                     {suggestion.description}
                     </div>
                   );
                  })}
                  </div>
                </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div onClick={searchHandler}>
          <Button style={{color:'white'}}>
            search
          </Button>
        </div>
        </div>
        </div>
      </div>
    )
}
