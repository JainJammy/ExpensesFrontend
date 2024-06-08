import {Store,applyMiddleware,createStore,compose} from 'redux';
import logger from 'redux-logger';
import {thunk} from 'redux-thunk';
//import {save,load} from 'redux-localstorage-simple';
import rootReducer from './root-reducer';
import {ApplicationState} from "./index";
const middleware:any=[logger,thunk];
const composeEnhancers=compose;
const enhancer=composeEnhancers(
    applyMiddleware(...middleware)
);
export default function configureStore():Store<ApplicationState>{
const store=createStore(rootReducer,enhancer);
return store;
}