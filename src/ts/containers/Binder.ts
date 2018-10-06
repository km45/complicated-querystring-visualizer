import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import {Binder} from '../components/Binder';
import {ObjectTable} from '../logic/table-data';
import {RootState} from '../store';

interface StateProps {
  table: ObjectTable;
  text: string;
}

interface DispatchProps {
  dispatch: Redux.Dispatch<any>;
}

export interface Props {
  dispatch: Redux.Dispatch<any>;
  table: ObjectTable;
  text: string;
}

function mapStateToProps(state: RootState): StateProps {
  return {
    table: state.table.table,
    text: state.form.text
  };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {dispatch};
}

function mergeProps(
    stateProps: StateProps, dispatchProps: DispatchProps, _: any): Props {
  return {
    dispatch: dispatchProps.dispatch,
    table: stateProps.table,
    text: stateProps.text
  };
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps, mergeProps)(Binder);
