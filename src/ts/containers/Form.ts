import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import Form from '../components/Form';
import {setFormText} from '../modules/Form';
import {RootState} from '../store';

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
  values: StateProps;
}

function mapStateToProps(state: RootState): StateProps {
  return {text: (state.form.text ? state.form.text : '')};
}

function mapDispatchToProps(dispatch: any): DispatchProps {
  return {actions: new Actions(dispatch)};
}

function mergeProps(
    stateProps: StateProps, dispatchProps: DispatchProps, _: any): Props {
  return {actions: dispatchProps.actions, values: stateProps};
}

export default ReactRedux.connect(
    mapStateToProps, mapDispatchToProps, mergeProps)(Form);
