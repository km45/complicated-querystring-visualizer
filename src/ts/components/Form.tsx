import * as React from "react";

import * as SemanticUiReact from "semantic-ui-react";

export interface Props {
    text: string;
}

interface State {
    text: string;
}

export class Form extends React.Component<Props, State> {
    public constructor(props: Props, context: State) {
        super(props, context);
        this.state = {
            text: props.text
        };
    }

    private onTextAreaChange(event: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({
            text: event.currentTarget.value
        });
    }

    public getText(): string {
        return this.state.text;
    }

    public setText(text: string): void {
        this.setState({
            text: text
        })
    }

    public render() {
        return (
            <SemanticUiReact.Form>
                <SemanticUiReact.TextArea
                    autoHeight={true}
                    onChange={(event) => this.onTextAreaChange(event)}
                    value={this.state.text} />
            </SemanticUiReact.Form>
        );
    }
}