import React from "react";
import {connect} from "react-redux"

import Snackbar from "material-ui/Snackbar"

import {resetLoadError} from "../redux/ActionCreators"

const Notifier = function ({message, dispatch}) {
    return (
        <Snackbar
            open={!!message}
            message={message}
            action="close"
            autoHideDuration={2000}
            onRequestClose={() => {
                dispatch(resetLoadError());
            }}
        />
    )
};

export default connect(({loadError}) => {
    return {
        message: loadError
    }
})(Notifier);