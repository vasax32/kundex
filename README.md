
This project aggregates search results on available albums regarding search term from iTunes and Spotify api's.

## Key features

 - [fetch-jsonp](https://github.com/camsong/fetch-jsonp) used to access iTunes api because it requires JSONP requests
 - [axios](https://github.com/mzabriskie/axios) used to access Spotify api because it supports request cancellation via [Cancellation Tokens](https://github.com/mzabriskie/axios#cancellation)
 - [redux](https://github.com/reactjs/redux) used to easily update and connect application state to desirable components
 - [redux-saga](https://github.com/redux-saga/redux-saga) used to handle asynchronous data fetch operations and solve race conditions via take [takeLatest](https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Concurrency.md)

## Known limitations

 - only first 25 items will be fetched from both of api's
 - same albums with different name on iTunes and Spotify can be not merged when has unknown suffixes or prefixes

## Running
### `npm install` && `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
