import * as Redux from 'redux';

import * as StringifiedQuery from './modules/StringifiedQuery';
import * as StructuredQuery from './modules/StructuredQuery';

export interface RootState {
  stringifiedQuery: StringifiedQuery.State
  structuredQuery: StructuredQuery.State
}

// singleton
export default Redux.createStore(Redux.combineReducers<RootState>({
  stringifiedQuery: StringifiedQuery.default,
  structuredQuery: StructuredQuery.default
}));
