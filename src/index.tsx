import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as _ from 'lodash';


const rootElement = document.getElementById('root');

if(rootElement){
    ReactDOM.render(<App /> ,rootElement);
}