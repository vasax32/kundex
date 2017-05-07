import {SET_SEARCH_TERM, LOAD_ERROR_RESET} from "./Actions"

export function setSearchTerm(term) {
    return {type: SET_SEARCH_TERM, term};
}

export function resetLoadError() {
    return {type: LOAD_ERROR_RESET};
}