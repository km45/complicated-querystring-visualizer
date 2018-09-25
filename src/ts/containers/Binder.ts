import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import {Binder} from '../components/Binder';
import {RootState} from '../store';

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

function mapStateToProps(state: RootState): StateProps {
  return {text: (state.form.text ? state.form.text : '')};
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {dispatch};
}

function mergeProps(
    stateProps: StateProps, dispatchProps: DispatchProps, _: any): Props {
  return {dispatch: dispatchProps.dispatch, text: stateProps.text};
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps, mergeProps)(Binder);
