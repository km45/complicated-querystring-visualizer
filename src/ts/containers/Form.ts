import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import {Form} from '../components/Form';
import {FormState} from '../modules/Form';

interface StateProps {
  text: string;
}

interface DispatchProps {
  dispatch: Redux.Dispatch<any>;
}

export interface Props {
  dispatch: Redux.Dispatch<any>;
  text: string;
}

function mapStateToProps(state: FormState): StateProps {
  return {text: (state.text ? state.text : '')};
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {dispatch};
}

function mergeProps(
    stateProps: StateProps, dispatchProps: DispatchProps, _: any): Props {
  return {dispatch: dispatchProps.dispatch, text: stateProps.text};
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps, mergeProps)(Form);
