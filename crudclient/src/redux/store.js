import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteStoreReducer, searchResultReducer, storeSaveReducer, storesListReducer, updateStoreReducer,searchOneReducer } from "./reducers/storereducers";

const initialState = {};

const reducer = combineReducers({
  storesList:storesListReducer,
  updateStore:updateStoreReducer,
  deleteStore:deleteStoreReducer,
  saveStore:storeSaveReducer,
  searchResult:searchResultReducer,
  searchOne:searchOneReducer
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;