import { combineReducers } from 'redux';
import { pets } from './components/petReducer';
import { resetStateReducer } from './resetStateReducer';

const appReducer = combineReducers({
  resetStateReducer,
  pets
});

export default appReducer;
