import * as React from "react";

export interface FormProps {
    compiler: string;
    framework: string;
}

class FormState {
    text: string;
}

export class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
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