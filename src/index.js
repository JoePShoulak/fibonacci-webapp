import React from 'react';

import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline";

import App from './App';
import theme from './theme'
import rootReducer from "./redux/reducers/_rootReducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import Grid from "@material-ui/core/Grid";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </Provider>,
document.getElementById('root')
);
