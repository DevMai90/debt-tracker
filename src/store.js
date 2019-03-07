import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import { API_KEY } from './apiKey';

// Custom reducers
import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'repayment-calculator.firebaseapp.com',
  databaseURL: 'https://repayment-calculator.firebaseio.com',
  projectId: 'repayment-calculator',
  storageBucket: 'repayment-calculator.appspot.com',
  messagingSenderId: '1013311495506'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

// Initialize firebase app
firebase.initializeApp(firebaseConfig);

// Initialize firestore
const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
