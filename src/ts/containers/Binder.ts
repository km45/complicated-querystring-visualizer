import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import {Binder} from '../components/Binder';
import {ObjectTable} from '../logic/table-data';
import {RootState} from '../store';

interface StateProps {
  basicTable: ObjectTable;
  coordTable: ObjectTable;
  text: string;
}

interface DispatchProps {
  dispatch: Redux.Dispatch<any>;
}

export interface Props {
  basicTable: ObjectTable;
  coordTable: ObjectTable;
  dispatch: Redux.Dispatch<any>;
  text: string;
}

function mapStateToProps(state: RootState): StateProps {
  return {
    basicTable: state.structuredQuery.basicTable,
    coordTable: state.structuredQuery.coordTable,
    text: state.stringifiedQuery.text
  };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {dispatch};
}

function mergeProps(
    stateProps: StateProps, dispatchProps: DispatchProps, _: any): Props {
  return {
    basicTable: stateProps.basicTable,
    coordTable: stateProps.coordTable,
    dispatch: dispatchProps.dispatch,
    text: stateProps.text
  };
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps, mergeProps)(Binder);
