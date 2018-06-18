import * as React from "react";

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

    private onTextAreaChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            text: event.target.value
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
            <form>
                <input type="text"
                    value={this.state.text}
                    onChange={(event) => this.onTextAreaChange(event)} />
            </form>
        );
    }
}