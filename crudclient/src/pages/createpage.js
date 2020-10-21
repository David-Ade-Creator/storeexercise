import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addlocation, getonestore, savestore } from '../redux/actions/storeaction';

export default function Createpage(props) {
    const [storename,setStorename] = useState('');
    const [aptname,setAptname] = useState('');
    const [street,setStreet] = useState('');
    const [locality,setLocality] = useState('')
    const [zipcode,setZipcode] = useState('')
    const [storeId,setStoreId] = useState('')


    const saveStore = useSelector(state=>state.saveStore);
    const {loading,store,error} = saveStore;

    const dispatch = useDispatch();

    const submitHandler =(e) => {
        e.preventDefault()
        dispatch(addlocation(storename,aptname,street,locality,zipcode));
    }

    useEffect(()=>{
    },[])


    return (
        <div className="createpage">
        <div className="createheader">
          <h4>Store a book</h4>
        </div>
        <div className="createform">
        <form noValidate onSubmit={submitHandler}>
          {store && <div>New store has been created</div> }
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Store Name"
            name="storename"
            value={storename}
            onChange={(e)=>setStorename(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="aptname"
            label="Apt Name"
            type="text"
            value={aptname}
            onChange={(e)=>setAptname(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Locality"
            type="text"
            value={locality}
            onChange={(e)=>setLocality(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="street"
            label="Street"
            type="text"
            value={street}
            onChange={(e)=>setStreet(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="zipcode"
            label="Zipcode"
            type="text"
            value={zipcode}
            onChange={(e)=>setZipcode(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            { storeId ? 'Update' : 'Add'}
          </Button>
        </form>
        </div>
      </div>
    )
}
