import * as Redux from 'redux';

import reducer from './modules/Form';

// singleton
export default Redux.createStore(reducer);
