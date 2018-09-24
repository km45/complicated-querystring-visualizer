import * as Redux from 'redux';

import reducer from './reducer';

// singleton
export default Redux.createStore(reducer);
