import * as Redux from 'redux';

import * as Form from './modules/Form';
import * as Table from './modules/Table';

export interface RootState {
  form: Form.State
  table: Table.State
}

// singleton
export default Redux.createStore(Redux.combineReducers<RootState>(
    {form: Form.default, table: Table.default}));
