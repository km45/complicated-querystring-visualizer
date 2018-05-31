import * as React from "react";

export interface Props { }

interface State {
    text: string;
}

export class Form extends React.Component<Props, State> {
    public constructor(props: Props, context: State) {
        super(props, context);
        this.state = {
            text: 'a=1&b=2&c=3&coord1=x1,y1,z1&coord2=x2,y2,z2'
        };
    }

    private onClickClear(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState({
            text: ''
        });
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
                <input type="button"
                    value="Clear"
                    onClick={(event) => this.onClickClear(event)} />
            </form>
        );
    }
}