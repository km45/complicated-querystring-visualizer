import * as ReactRedux from 'react-redux';

import {Binder} from '../components/Binder';
import {State} from '../modules/Form';

const mapStateToProps = (state: State) => state;

export default ReactRedux.connect(mapStateToProps)(Binder);
