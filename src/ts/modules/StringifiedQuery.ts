import * as TypescriptFsa from 'typescript-fsa';
import * as TypescriptFsaReducers from 'typescript-fsa-reducers';

export interface State {
  text: string;
}

const initialReduceState: State = {
  text: ''
};

function handler(state: State, payload: string): State {
  return {...state, text: payload};
}

// ----------------------------------------------------------------------------
// action types
// ----------------------------------------------------------------------------
const SET_TEXT = 'complicated-querystring-visualizer/StringifiedQuery/SET_TEXT';

// ----------------------------------------------------------------------------
// action creators
// ----------------------------------------------------------------------------
const actionCreator = TypescriptFsa.actionCreatorFactory();

export const setText = actionCreator<string>(SET_TEXT);

// ----------------------------------------------------------------------------
// reducer
// ----------------------------------------------------------------------------
export default TypescriptFsaReducers.reducerWithInitialState(initialReduceState)
    .case(setText, handler)
    .build();
