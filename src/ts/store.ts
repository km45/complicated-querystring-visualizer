import * as Redux from 'redux';

import reducer from './reducer';

export const buildFormStore = () => (Redux.createStore(reducer));
