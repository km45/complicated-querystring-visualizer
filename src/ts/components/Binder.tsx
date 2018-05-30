import * as React from "react";

import { Form } from "./Form";
import { Grid } from "./Grid";

import { Columns, generateQuery, parseQuery, arrayTableToObjectTable, objectTableToArrayTable } from "../logic/converter";

export interface Props { }
interface State { }

// https://stackoverflow.com/questions/33796267/how-to-use-refs-in-react-with-typescript
class BinderImplRef {
    form: React.RefObject<Form> = React.createRef();
    grid: React.RefObject<Grid> = React.createRef();
}

export class Binder extends React.Component<Props, State> {
    private ref = new BinderImplRef();
    private columns: Columns = [
        {
            key: 'key',
            name: 'Key'
        }, {
            key: 'value',
            name: 'Value'
        }];

    public constructor(props: Props, context: State) {
        super(props, context);
    }

    private onFormToGrid(text: string): void {
        console.log('onFormToGrid')
        let data = { id: "1", title: "Title1", count: "Count" };
        this.setState({
            form_text: text,
            grid_data: data
        });
    };

    private onClickFormToGrid(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('onClickFormToGrid');

        let query = this.ref.form.current.getText();
        let parsed_result = parseQuery(query);
        let converted_result = arrayTableToObjectTable(
            this.columns, parsed_result);

        this.ref.grid.current.setRows(converted_result);
    }

    private onClickGridToForm(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('onClickGridToForm');

        const rows = this.ref.grid.current.getRows();
        const converted = objectTableToArrayTable(this.columns, rows);
        const query = generateQuery(converted);

        this.ref.form.current.setText(query);
    }

    public render() {
        return (
            <div>
                <Form ref={this.ref.form} />
                <form>
                    <input type="button"
                        value="form2grid"
                        onClick={(event) => this.onClickFormToGrid(event)} />
                    <input type="button"
                        value="grid2from"
                        onClick={(event) => this.onClickGridToForm(event)} />
                </form>
                <Grid
                    columns={this.columns}
                    ref={this.ref.grid} />
            </div>
        );
    }
}