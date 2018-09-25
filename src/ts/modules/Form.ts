import * as TypescriptFsa from 'typescript-fsa';
import * as TypescriptFsaReducers from 'typescript-fsa-reducers';

export interface State {
  text: string;
}

const initialReduceState: State = {
  text: ''
};

function handler(state: State, payload: string): any {
  return {...state, text: payload};
}

// ----------------------------------------------------------------------------
// action types
// ----------------------------------------------------------------------------
const SET_TEXT = 'react-studies/Form/SET_TEXT';

// ----------------------------------------------------------------------------
// action creators
// ----------------------------------------------------------------------------
const actionCreator = TypescriptFsa.actionCreatorFactory();

export const setFormText = actionCreator<string>(SET_TEXT);

// ----------------------------------------------------------------------------
// reducer
// ----------------------------------------------------------------------------
export default TypescriptFsaReducers.reducerWithInitialState(initialReduceState)
    .case(setFormText, handler)
    .build();
