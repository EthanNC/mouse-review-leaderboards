import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import { configureStore } from './store/configureStore';

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>    
    , document.getElementById('root'));
