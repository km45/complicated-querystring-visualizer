import * as React from 'react';
import * as SemanticUiReact from 'semantic-ui-react';

interface State { }

export interface Actions {
    setText(text: string): void;
}

export interface Values {
    text: string;
}

export interface Props {
    actions: Actions;
    values: Values;
}

export default class Form extends React.Component<Props, State> {
    public constructor(props: Props, context: State) {
        super(props, context);
    }

    public render() {
        return (
            <SemanticUiReact.Form>
                <SemanticUiReact.TextArea
                    autoHeight={true}
                    onChange={(event) => this.onTextAreaChange(event)}
                    value={this.props.values.text}
                />
            </SemanticUiReact.Form>
        );
    }

    private onTextAreaChange(event: React.FormEvent<HTMLTextAreaElement>) {
        this.props.actions.setText(event.currentTarget.value);
    }
}
