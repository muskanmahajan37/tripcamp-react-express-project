// frontend/src/store/index.js

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import fetch from './csrf';
import sessionReducer from './session';
import spotReducer from './spot';
import bookingReducer from './booking';
import reviewReducer from './review';
import ratingReducer from './rating';
import mediumReducer from './media';
import searchReducer from './search';
import userReducer from './user';
import relationshipReducer from './relationship';
import messageReducer from './message';

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotReducer,
  bookings: bookingReducer,
  reviews: reviewReducer,
  ratings: ratingReducer,
  media: mediumReducer,
  searchs: searchReducer,
  users: userReducer,
  relationships: relationshipReducer,
  messages: messageReducer
});

let enhancer;

if(process.env.NODE_ENV === 'production'){
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;