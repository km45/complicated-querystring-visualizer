import * as React from 'react';
import * as Redux from 'redux';
import * as SemanticUiReact from 'semantic-ui-react';

import { FormState, setFormText } from '../modules/Form'

export interface Props extends FormState {
    dispatch: Redux.Dispatch<any>;
}

interface State { }

export class Form extends React.Component<Props, State> {
    public constructor(props: Props, context: State) {
        super(props, context);
    }

    public render() {
        return (
            <SemanticUiReact.Form>
                <SemanticUiReact.TextArea
                    autoHeight={true}
                    onChange={(event) => this.onTextAreaChange(event)}
                    value={this.props.text}
                />
            </SemanticUiReact.Form>
        );
    }

    private onTextAreaChange(event: React.FormEvent<HTMLTextAreaElement>) {
        this.props.dispatch(setFormText(event.currentTarget.value));
    }
}
