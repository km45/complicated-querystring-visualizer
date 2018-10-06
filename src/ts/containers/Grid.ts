import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import Grid from '../components/Grid';
import {Columns, ObjectTable} from '../logic/table-data';
import {setTable} from '../modules/Table';
import {RootState} from '../store';

class Actions {
  private dispatch: Redux.Dispatch<any>;

  constructor(dispatch: Redux.Dispatch<any>) {
    this.dispatch = dispatch;
  }

  public setTable(table: ObjectTable): void {
    this.dispatch(setTable(table));
  }
}

interface StateProps {
  table: ObjectTable;
}

interface DispatchProps {
  actions: Actions;
}

interface OwnProps {
  columns: Columns;
  title: string;
}

interface Values {
  columns: Columns;
  table: ObjectTable;
  title: string;
}

export interface Props {
  actions: Actions;
  values: Values;
}

function mapStateToProps(state: RootState): StateProps {
  return {table: state.table.table};
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {actions: new Actions(dispatch)};
}

function mergeProps(
    stateProps: StateProps, dispatchProps: DispatchProps,
    ownProps: OwnProps): Props {
  return {
    actions: dispatchProps.actions,
    values: {
      columns: ownProps.columns,
      table: stateProps.table,
      title: ownProps.title
    }
  };
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps, mergeProps)(Grid);
