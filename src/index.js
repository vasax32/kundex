import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "babel-polyfill"

import Perf from 'react-addons-perf';
window.Perf = Perf;

import Store from "./redux/Store"

import {Provider} from "react-redux"

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={Store()}>
            <App />
        </Provider>
    </MuiThemeProvider>
    ,
    document.getElementById('root')
);
