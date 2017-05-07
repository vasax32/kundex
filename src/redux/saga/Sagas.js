import {call, put, takeLatest} from "redux-saga/effects";
import {delay} from "redux-saga"
import fetchJsonp from "fetch-jsonp";
import fetchApi from "../../Util"

import {
    SET_SEARCH_TERM,
    LOAD_FROM_ITUNES, LOAD_FROM_ITUNES_SUCCESS,
    LOAD_FROM_SPOTIFY, LOAD_FROM_SPOTIFY_SUCCESS,
    LOAD_ERROR
} from "../Actions";


const loadDelay = 500;
const loadLimit = 25;

function* loadFromItunes(action) {
    try {
        yield call(delay, loadDelay);
        const response = yield call(fetchJsonp, `https://itunes.apple.com/search?term=${action.term}&entity=album&limit=${loadLimit}`);
        const json = yield response.json();
        yield put({type: LOAD_FROM_ITUNES_SUCCESS, items: json.results});

    } catch (e) {
        yield put({type: LOAD_ERROR, source: LOAD_FROM_ITUNES, ex: e});
    }
}

function* loadFromSpotify(action) {
    try {
        yield call(delay, loadDelay);
        const response = yield call(fetchApi, `https://api.spotify.com/v1/search?query=${action.term}&type=album&offset=0&limit=${loadLimit}`);
        const json = response.data;
        yield put({type: LOAD_FROM_SPOTIFY_SUCCESS, items: json.albums.items});
    } catch (e) {
        yield put({type: LOAD_ERROR, source: LOAD_FROM_SPOTIFY, ex: e});
    }
}

export default function* rootSaga() {
    yield takeLatest(SET_SEARCH_TERM,
        function*(action) {
            yield put({type: LOAD_FROM_ITUNES, term: action.term});
            yield put({type: LOAD_FROM_SPOTIFY, term: action.term});
        });

    yield takeLatest(LOAD_FROM_ITUNES, loadFromItunes);
    yield takeLatest(LOAD_FROM_SPOTIFY, loadFromSpotify);
}