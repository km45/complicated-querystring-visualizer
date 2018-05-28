import * as React from "react";

class FormState {
    text: string;
}

export class Form extends React.Component<{}, FormState> {
    constructor(props: any, context: FormState) {
        super(props, context);
        this.state = {
            text: 'sample text'
        };
    }

    onClick(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log(this.state);
    }

    onTextAreaChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            text: event.target.value
        });
    }

    getText(): string {
        return this.state.text;
    }

    setText(text: string): void {
        this.setState({
            text: text
        })
    }

    render() {
        return (
            <form>
                <input type="text"
                    value={this.state.text}
                    onChange={(event) => this.onTextAreaChange(event)} />
                <input type="button"
                    value="OK"
                    onClick={(event) => this.onClick(event)} />
            </form>
        );
    }
}