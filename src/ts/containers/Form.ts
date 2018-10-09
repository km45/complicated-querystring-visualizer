import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as Component from '../components/Form';
import {setText} from '../modules/StringifiedQuery';
import {RootState} from '../store';

class Actions implements Component.Actions {
  private dispatch: Redux.Dispatch<any>;

  constructor(dispatch: Redux.Dispatch<any>) {
    this.dispatch = dispatch;
  }

  public setText(text: string): void {
    this.dispatch(setText(text));
  }
}

interface StateProps {
  text: string;
}

interface DispatchProps {
  actions: Actions;
}

function mapStateToProps(state: RootState): StateProps {
  return {
    text: (state.stringifiedQuery.text ? state.stringifiedQuery.text : '')
  };
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {actions: new Actions(dispatch)};
}

function mergeProps(
    stateProps: StateProps, dispatchProps: DispatchProps,
    _: any): Component.Props {
  return {actions: dispatchProps.actions, values: stateProps};
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps, mergeProps)(Component.default);
