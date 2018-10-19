import * as TypescriptFsa from 'typescript-fsa';
import * as TypescriptFsaReducers from 'typescript-fsa-reducers';

import {ObjectTable} from '../logic/table-data';

export const enum TablesIndex {
  Basic,
  Coord,
  Host,
  Size  // HACK: not use last value as size
}

export interface State {
  tables: ObjectTable[];
}

const initialReduceState: State = {
  tables: Array(TablesIndex.Size).fill([])
};

export interface SetTablePayload {
  index: TablesIndex;
  table: ObjectTable;
}

function setTableHandler(state: State, payload: SetTablePayload): State {
  return {
    ...state,
    tables: state.tables.map(
        (table: ObjectTable, index: number):
            ObjectTable => {
              if (index !== payload.index) {
                return table;
              }
              return payload.table;
            })
  };
}

// ----------------------------------------------------------------------------
// action types
// ----------------------------------------------------------------------------
const SET_TABLE = 'react-studies/StructuredQuery/SET_TABLE';

// ----------------------------------------------------------------------------
// action creators
// ----------------------------------------------------------------------------
const actionCreator = TypescriptFsa.actionCreatorFactory();

export const setTable = actionCreator<SetTablePayload>(SET_TABLE);

// ----------------------------------------------------------------------------
// reducer
// ----------------------------------------------------------------------------
export default TypescriptFsaReducers.reducerWithInitialState(initialReduceState)
    .case(setTable, setTableHandler)
    .build();
