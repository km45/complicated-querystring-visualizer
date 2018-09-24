import * as ReactRedux from 'react-redux';

import {Form} from '../components/Form';
import {FormState} from '../modules/Form';

const mapStateToProps = (state: FormState) => state;

export default ReactRedux.connect(mapStateToProps)(Form);
