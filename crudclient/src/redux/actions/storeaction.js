
    //  axiosNewInstance
    //    .get("https://maps.googleapis.com/maps/api/geocode/json", {
    //      params: {
    //        address: location,
    //        key: process.env.REACT_APP_GOOGLE_API_KEY,
    //      },
    //    })

import Axios from 'axios';
import { SAVE_STORE_FAIL, SAVE_STORE_REQUEST, SAVE_STORE_SUCCESS, SEARCH_ONE_FAIL, SEARCH_ONE_REQUEST, SEARCH_ONE_SUCCESS, STORE_LIST_FAIL, STORE_LIST_REQUEST, STORE_LIST_SUCCESS, UPDATE_STORE_FAIL, UPDATE_STORE_REQUEST, UPDATE_STORE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_SEARCH_FAIL, USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS } from '../constants/storeconstants';


 const addlocation = (storename,aptname,locality, street, zipcode) => async (dispatch) => {
    const location = `+${aptname},+${locality},+${street},+${zipcode}`;
    console.log(location);
    Axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
       address: location,
        key: 'AIzaSyB9bl5Se13WDa8O6zfR-Z5i5Zer79aOLN8',
      },
    }).then((result)=>{
      const lat = result.data.results[0].geometry.location.lat;
      const lng = result.data.results[0].geometry.location.lng; 
      dispatch(savestore(storename,aptname,street,locality,zipcode,lat,lng))
    }).catch((err)=>{console.log(err);})
}

const editstorelocation = (Id,storename,aptname,locality, street, zipcode) => async (dispatch) => {
  const location = `+${aptname},+${locality},+${street},+${zipcode}`;
  console.log(location);
  Axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
     address: location,
      key: 'AIzaSyB9bl5Se13WDa8O6zfR-Z5i5Zer79aOLN8',
    },
  }).then((result)=>{
    const lat = result.data.results[0].geometry.location.lat;
    const lng = result.data.results[0].geometry.location.lng; 
    dispatch(updatestore(Id,storename,aptname,street,locality,zipcode,lat,lng))
  }).catch((err)=>{console.log(err);})
}

const liststores = () => async (dispatch) => {
  dispatch({ type: STORE_LIST_REQUEST });
  try {
    const { data } = await Axios.get("/api/s3");
    dispatch({ type: STORE_LIST_SUCCESS, payload: data });
  } catch (error) {
    //   console.log("CATCH = ", error.response);
    dispatch({ type: STORE_LIST_FAIL, payload: error.response.data.errors });
  }
};


const savestore = (storename,aptname,locality, street, zipcode, lat, lng) => async (dispatch) => {
  try {
    dispatch ({type: SAVE_STORE_REQUEST, payload:{storename,aptname,locality, street, zipcode,lat,lng}})
    const {data} = await Axios.post('/api/s3',{storename,aptname,locality, street, zipcode,lat,lng})
    dispatch ({type : SAVE_STORE_SUCCESS, payload:data})
  } catch (error) {
    dispatch({ type: SAVE_STORE_FAIL, payload:error.response.data.errors})
  }
}

const updatestore = (Id,storename,aptname,locality, street, zipcode, lat, lng) => async (dispatch) => {
  try {
    dispatch ({type: UPDATE_STORE_REQUEST, payload:{storename,aptname,locality, street, zipcode,lat,lng}})
    const {data} = await Axios.put(`/api/s3/${Id}/update`,{storename,aptname,locality, street, zipcode,lat,lng})
    dispatch ({type : UPDATE_STORE_SUCCESS, payload:data})
  } catch (error) {
    dispatch({ type: UPDATE_STORE_FAIL, payload:error.response.data.errors})
  }
}

const getsearchedstore = (lat,lng) => async (dispatch)=> {
  try {
    dispatch ({type: USER_SEARCH_REQUEST,payload:{lat,lng}});
    const {data} = await Axios.get(`/api/s3/search`,{lat,lng})
    dispatch ({type: USER_SEARCH_SUCCESS, payload:data });
  } catch (error) {
   // console.log(error.response);
    dispatch ({type: USER_SEARCH_FAIL,payload:error.response.data.errors});
  }
}

const getonestore = (Id) => async (dispatch)=> {
  try {
    dispatch ({type: SEARCH_ONE_REQUEST});
    const {data} = await Axios.get(`/api/s3/${Id}`)
    dispatch ({type: SEARCH_ONE_SUCCESS, payload:data });
  } catch (error) {
   // console.log(error.response);
    dispatch ({type: SEARCH_ONE_FAIL,payload:error.response.data.errors});
  }
}

const deletestore = (Id) => async (dispatch)=>{
try {
  dispatch ({type: USER_DELETE_REQUEST});
  const {data} = await Axios.delete(`/api/s3/${Id}/delete`)
  dispatch ({type: USER_DELETE_SUCCESS, payload:data.message });
} catch (error) {
  dispatch ({type: USER_DELETE_FAIL,payload:error.response.data.errors});
}
}

  
  


export {
  addlocation,
  editstorelocation,
  savestore,
  getsearchedstore,
  deletestore,
  liststores,
  updatestore,
  getonestore
}