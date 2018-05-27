import * as React from "react";
import * as ReactDOM from "react-dom";

import { Form } from "./Form";
import { Grid } from "./Grid";

export interface BinderProps {}

// https://stackoverflow.com/questions/33796267/how-to-use-refs-in-react-with-typescript
class BinderImplRef {
    form: React.RefObject<Form> = React.createRef();
}

export class Binder extends React.Component<BinderProps, {}> {
    private ref = new BinderImplRef();

    constructor(props: BinderProps, context: any) {
        super(props, context);
    }

    onFormToGrid(text: string): void {
        console.log('onFormToGrid')
        let data = { id: "1", title: "Title1", count: "Count" };
        this.setState({
            form_text: text,
            grid_data: data
        });
    };

    onClickFormToGrid(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('onClickFormToGrid');

        console.log(this.ref.form.current.getText());
    }

    onClickGridToForm(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('onClickGridToForm');

        this.ref.form.current.setText('changed by onClickGridToForm()');
    }

    render() {
        return (
            <div>
                <Form
                    compiler="TypeScript"
                    framework="React"
                    ref={this.ref.form} />
                <form>
                    <input type="button"
                        value="form2grid"
                        onClick={(event) => this.onClickFormToGrid(event)} />
                    <input type="button"
                        value="grid2from"
                        onClick={(event) => this.onClickGridToForm(event)} />
                </form>
                <Grid
                    compiler="TypeScript"
                    framework="React" />
            </div>
        );
    }
}