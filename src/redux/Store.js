import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";

import Reducers from "./Reducers"
import Sagas from "./saga/Sagas"

export default function (initState) {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(Reducers, initState, composeEnhancers(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(Sagas);
    return store;
}
