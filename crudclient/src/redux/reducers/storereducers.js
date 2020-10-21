const { STORE_LIST_REQUEST, STORE_LIST_SUCCESS, STORE_LIST_FAIL, SAVE_STORE_REQUEST, SAVE_STORE_SUCCESS, SAVE_STORE_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, UPDATE_STORE_FAIL, UPDATE_STORE_SUCCESS, UPDATE_STORE_REQUEST, USER_SEARCH_FAIL, USER_SEARCH_SUCCESS, USER_SEARCH_REQUEST, SEARCH_ONE_REQUEST, SEARCH_ONE_SUCCESS, SEARCH_ONE_FAIL } = require("../constants/storeconstants");

function storesListReducer(state = { stores: [] }, action) {
    switch (action.type) {
        case STORE_LIST_REQUEST:
            return { loading: true };
        case STORE_LIST_SUCCESS:
            return { loading: false, stores: action.payload };
        case STORE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function storeSaveReducer(state = {}, action) {
    switch (action.type) {
        case SAVE_STORE_REQUEST:
            return { loading: true };
        case SAVE_STORE_SUCCESS:
            return { loading: false, store: action.payload, success: true };
        case SAVE_STORE_FAIL:
            return { loading: false, errror: action.payload };
        default:
            return state;
    }
}

function deleteStoreReducer(state = {}, action) {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { loading: true };
        case USER_DELETE_SUCCESS:
            return { loading: false, message: action.payload, success: true };
        case USER_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function updateStoreReducer ( state = {message:{}}, action){
    switch (action.type) {
        case UPDATE_STORE_REQUEST:
            return { loading: true };
        case UPDATE_STORE_SUCCESS:
            return { loading: false, store: action.payload, success: true };
        case UPDATE_STORE_FAIL:
            return { loading: false, errror: action.payload };
        default:
            return state;
    }
}

function searchResultReducer ( state = {stores : []}, action){
    switch (action.type) {
        case USER_SEARCH_REQUEST:
            return { loading: true };
        case USER_SEARCH_SUCCESS:
            return { loading: false, stores: action.payload, success: true };
        case USER_SEARCH_FAIL:
            return { loading: false, errror: action.payload };
        default:
            return state;
    }
}

function searchOneReducer ( state = {store : {}}, action){
    switch (action.type) {
        case SEARCH_ONE_REQUEST:
            return { loading: true };
        case SEARCH_ONE_SUCCESS:
            return { loading: false, store: action.payload, success: true };
        case SEARCH_ONE_FAIL:
            return { loading: false, errror: action.payload };
        default:
            return state;
    }
}


export {
    searchResultReducer,
    updateStoreReducer,
    deleteStoreReducer,
    storeSaveReducer,
    storesListReducer,
    searchOneReducer
}