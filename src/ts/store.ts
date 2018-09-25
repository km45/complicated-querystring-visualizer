import * as Redux from 'redux';

import * as Form from './modules/Form';
import form from './modules/Form';

export interface RootState {
  form: Form.State
}

// singleton
export default Redux.createStore(Redux.combineReducers<RootState>({form}));
