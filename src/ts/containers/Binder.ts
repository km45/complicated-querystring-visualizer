import * as ReactRedux from 'react-redux';

import {Binder} from '../components/Binder';
import {BinderState} from '../reducer';

const mapStateToProps = (state: BinderState) => state;

export default ReactRedux.connect(mapStateToProps)(Binder);
