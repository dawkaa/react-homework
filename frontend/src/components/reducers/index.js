import { combineReducers } from 'redux';
import mainFeaturedPost from './mainFeaturedPost';
import notify from './notify';
import comment from './comment';

export default combineReducers({ mainFeaturedPost, notify, comment });
