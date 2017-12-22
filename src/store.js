import { createStore, applyMiddleware } from 'redux';
import dataReducer from './redux/reducer';
import promiseMiddleware from 'redux-promise';

export default createStore(dataReducer, applyMiddleware(promiseMiddleware));
