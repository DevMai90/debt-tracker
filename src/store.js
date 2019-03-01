import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase/app';
//'firebase/app'?
import 'firebase/firestore';
import { reduxFirestore, firestoreReducer } from 'redux-firestore;';
import API_KEY from './apiKey';

// Customer reducers
// @todo

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'repayment-calculator.firebaseapp.com',
  databaseURL: 'https://repayment-calculator.firebaseio.com',
  projectId: 'repayment-calculator',
  storageBucket: 'repayment-calculator.appspot.com',
  messagingSenderId: '1013311495506'
};
