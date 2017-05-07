import axios, { CancelToken } from 'axios'
import { CANCEL } from 'redux-saga'

export default function fetchAPI(url) {
    const source = CancelToken.source();
    const request = axios.get(url, { cancelToken: source.token });
    request[CANCEL] = () => source.cancel();
    return request;
}