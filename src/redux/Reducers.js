import {combineReducers} from "redux"

import {
    SET_SEARCH_TERM,
    LOAD_FROM_ITUNES,
    LOAD_FROM_ITUNES_SUCCESS,
    LOAD_FROM_SPOTIFY,
    LOAD_FROM_SPOTIFY_SUCCESS,
    LOAD_ERROR, LOAD_ERROR_RESET
} from "./Actions"

function searchTerm(state = "Radiohead", action) {
    if (action.type === SET_SEARCH_TERM) {
        return action.term;
    }
    return state;
}

const cleanUpTitle = (title) => title.replace(" - EP", "").replace(" - Single", "");

function itunesItems(state = {items: [], loading: false}, action) {
    switch (action.type) {
        case LOAD_FROM_ITUNES:
            return Object.assign({}, state, {items: [], loading: true});
        case LOAD_FROM_ITUNES_SUCCESS:
            return Object.assign({}, state, {
                items: action.items.map(item => Object.assign({}, item, {collectionName: cleanUpTitle(item.collectionName)})),
                loading: false
            });
        case LOAD_ERROR: return Object.assign({}, state, {loading: false});
        default:
            return state;
    }
}

function spotifyItems(state = {items: [], loading: false}, action) {
    switch (action.type) {
        case LOAD_FROM_SPOTIFY:
            return Object.assign({}, state, {items: [], loading: true});
        case LOAD_FROM_SPOTIFY_SUCCESS:
            return Object.assign({}, state, {
                items: action.items.map(item => Object.assign({}, item, {name: cleanUpTitle(item.name)})),
                loading: false
            });
        case LOAD_ERROR: return Object.assign({}, state, {loading: false});
        default:
            return state;
    }
}

function loadError(state = "", action) {
    switch (action.type) {
        case LOAD_ERROR:
            // eslint-disable-next-line
            switch (action.source) {
                case LOAD_FROM_ITUNES:
                    return "Cannot load from iTunes";
                case LOAD_FROM_SPOTIFY:
                    return "Cannot load from Spotify";
                default:
                    break;
            }
            // eslint-disable-next-line
            break;
        case LOAD_ERROR_RESET:
            return "";
        default:
            return state;
    }
}

export default combineReducers({searchTerm, itunesItems, spotifyItems, loadError});