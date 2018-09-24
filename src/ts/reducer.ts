import * as TypescriptFsaReducers from 'typescript-fsa-reducers';

import * as actions from './actions';

export interface FormState {
  text: string;
}

export interface BinderState extends FormState {
  query: string;
}

export const initialReduceState: FormState = {
  text: ''
};

function handler(state: FormState, payload: string): any {
  return {...state, text: payload};
}

export default TypescriptFsaReducers.reducerWithInitialState(initialReduceState)
    .case(actions.setFormText, handler)
    .build();
