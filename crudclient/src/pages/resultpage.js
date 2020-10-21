import { Button, TextField } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OutlinedCard from '../components/Card'
import { editstorelocation, liststores, updatestore } from '../redux/actions/storeaction'

export default function Resultpage() {
  const [storeId,setStoreId] = useState('');
  const [storename,setStorename] = useState('');
  const [aptname,setAptname] = useState('');
  const [street,setStreet] = useState('');
  const [locality,setLocality] = useState('')
  const [zipcode,setZipcode] = useState('')
  const [storeedit,setStoreedit] = useState(false)
  
  const searchResult = useSelector(state=>state.searchResult);
  const {loading,stores,error} = searchResult;

  const dispatch = useDispatch();

  useEffect(()=>{
    if(stores){
      toast.error('store has been updated')
    }
  },[])

  const openModal= (store) => {
    setStoreedit(true)
    setStoreId(store._id);
    setStorename(store.storename);
    setStreet(store.street);
    setZipcode(store.zipcode);
    setLocality(store.locality);
    setAptname(store.aptname)
  }

  const closeModal = (e) =>{
    e.preventDefault()
    setStoreedit(false)
  }

  const editHandler = (e) => {
    e.preventDefault()
    dispatch(editstorelocation(storeId,storename,aptname,locality, street, zipcode))
  }

    return loading ? <div>loading...</div> : 
    error ? <div>{error}</div> :   (
        <div className="searchpage">
        <div className="searchheader">
          <ToastContainer />
        <h4>Search Results</h4>
        </div>
        <div className="searchresult">
          {
            stores.map((store)=>
              (<OutlinedCard key={store._id} store={store} openModal={openModal}/>)
            )
          }
        </div>
        {storeedit &&
        <div className="editmodal">
        <div className="editform">
        <div className="createheader">
          <h4>Edit store</h4>
        </div>
        <form noValidate onSubmit={editHandler}>
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
          <div className="editbtns">
            <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            update
          </Button>
          </div>
          <div>
          <Button
           onClick={closeModal}
            fullWidth
            variant="contained"
            color="primary"
          >
            cancel
          </Button>
          </div>
          </div>
        </form>
        </div>
        </div>
}
      </div>
    )
}
