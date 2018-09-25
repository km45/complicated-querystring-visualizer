import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import Form from '../components/Form';
import {setFormText, State} from '../modules/Form';

class Actions {
  private dispatch: Redux.Dispatch<any>;

  constructor(dispatch: Redux.Dispatch<any>) {
    this.dispatch = dispatch;
  }

  public setFormText(text: string): void {
    this.dispatch(setFormText(text));
  }
}

interface StateProps {
  text: string;
}

interface DispatchProps {
  actions: Actions;
}

export interface Props {
  actions: Actions;
  text: string;
}

function mapStateToProps(state: State): StateProps {
  return {text: (state.text ? state.text : '')};
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {actions: new Actions(dispatch)};
}

function mergeProps(
    stateProps: StateProps, dispatchProps: DispatchProps, _: any): Props {
  return {actions: dispatchProps.actions, text: stateProps.text};
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps, mergeProps)(Form);
