import * as TypescriptFsa from 'typescript-fsa';
import * as TypescriptFsaReducers from 'typescript-fsa-reducers';

import {ObjectTable} from '../logic/table-data';

export const enum TablesIndex {
  Basic,
  Coord,
  Host,
  Size
}

export interface State {
  tables: ObjectTable[];
}

const initialReduceState: State = {
  tables: Array(TablesIndex.Size).fill([])
};

export interface UpdateTablePayload {
  index: TablesIndex;
  table: ObjectTable;
}

function updateTableHandler(state: State, payload: UpdateTablePayload): State {
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
const UPDATE_TABLE = 'react-studies/StructuredQuery/UPDATE_TABLE';

// ----------------------------------------------------------------------------
// action creators
// ----------------------------------------------------------------------------
const actionCreator = TypescriptFsa.actionCreatorFactory();

export const updateTable = actionCreator<UpdateTablePayload>(UPDATE_TABLE);

// ----------------------------------------------------------------------------
// reducer
// ----------------------------------------------------------------------------
export default TypescriptFsaReducers.reducerWithInitialState(initialReduceState)
    .case(updateTable, updateTableHandler)
    .build();
