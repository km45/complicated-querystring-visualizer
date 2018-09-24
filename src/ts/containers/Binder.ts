import * as ReactRedux from 'react-redux';

import {Binder} from '../components/Binder';
import {FormState} from '../modules/Form';

const mapStateToProps = (state: FormState) => state;

export default ReactRedux.connect(mapStateToProps)(Binder);
