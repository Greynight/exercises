import { createStore, applyMiddleware } from 'redux';
import dataReducer from './reducer';
import promiseMiddleware from 'redux-promise';

export default createStore(dataReducer, applyMiddleware(promiseMiddleware));
