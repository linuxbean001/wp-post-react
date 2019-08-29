import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router} from "react-router-dom";
import history from './helper/history';
console.log('%cCreated By Rahul Ppatidar https://github.com/rahulppatidar',
    `color: white; background-color: green; padding: 2px 5px; border-radius: 2px`);
ReactDOM.render(
<Router history={history}>
    <App />
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();