import React, {Component} from 'react';
import {connect} from "react-redux"

import {setSearchTerm} from "./redux/ActionCreators"

import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import AlbumList from "./components/AlbumList"
import Notifier from "./components/Notifier"

class App extends Component {

    componentWillMount() {
        this.props.dispatch(setSearchTerm(this.props.term))
    }

    render() {
        return (
            <div>
                <Notifier />
                <Paper style={{maxWidth: 1024, margin: "20px auto", padding: 15}} zDepth={2}>
                    <TextField
                        hintText="Enter search term"
                        floatingLabelText="Search albums by title, artists or song names"
                        fullWidth={true}
                        onChange={(e) => this.props.dispatch(setSearchTerm(e.target.value))} value={this.props.term}
                    />
                    <br/>
                    <AlbumList />
                </Paper>
            </div>
        );
    }
}

export default connect(({searchTerm}) => {
    return {
        term: searchTerm,
    }
})(App);
