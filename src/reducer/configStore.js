import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import quizReducer from './quizReducer';

const reducer = combineReducers({ quiz: quizReducer });

const store = configureStore({
  reducer,
  devTools: false,
  middleware: [thunk],
});

export default store;
