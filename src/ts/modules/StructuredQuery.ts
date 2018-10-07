import * as TypescriptFsa from 'typescript-fsa';
import * as TypescriptFsaReducers from 'typescript-fsa-reducers';

import {ObjectTable} from '../logic/table-data';

export interface State {
  table: ObjectTable;
}

const initialReduceState: State = {
  table: []
};

function handler(_: State, table: ObjectTable): any {
  return {table};
}

// ----------------------------------------------------------------------------
// action types
// ----------------------------------------------------------------------------
const SET_TABLE = 'react-studies/StructuredQuery/SET_TABLE';

// ----------------------------------------------------------------------------
// action creators
// ----------------------------------------------------------------------------
const actionCreator = TypescriptFsa.actionCreatorFactory();

export const setTable = actionCreator<ObjectTable>(SET_TABLE);

// ----------------------------------------------------------------------------
// reducer
// ----------------------------------------------------------------------------
export default TypescriptFsaReducers.reducerWithInitialState(initialReduceState)
    .case(setTable, handler)
    .build();
