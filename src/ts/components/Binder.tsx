import * as React from "react";

import { Form } from "./Form";
import { Grid } from "./Grid";

import {
    Columns,
    arrayTableToObjectTable,
    objectTableToArrayTable
} from '../logic/table-data'

import {
    generateQuery,
    parseQuery
} from "../logic/query-binder";

export interface Props { }
interface State { }

// https://stackoverflow.com/questions/33796267/how-to-use-refs-in-react-with-typescript
class BinderImplRef {
    form: React.RefObject<Form> = React.createRef();
    basic_grid: React.RefObject<Grid> = React.createRef();
    coord_grid: React.RefObject<Grid> = React.createRef();
}

export class Binder extends React.Component<Props, State> {
    private ref = new BinderImplRef();
    private basic_columns: Columns = [
        {
            key: 'key',
            name: 'Key'
        }, {
            key: 'value',
            name: 'Value'
        }];
    private coord_columns: Columns = [
        {
            key: 'key',
            name: 'Key'
        }, {
            key: 'x',
            name: 'x'
        }, {
            key: 'y',
            name: 'y'
        }, {
            key: 'z',
            name: 'z'
        }];

    public constructor(props: Props, context: State) {
        super(props, context);
    }

    private onClickFormToGrid(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('onClickFormToGrid');

        let query = this.ref.form.current.getText();
        let parsed_result = parseQuery(query);

        this.ref.basic_grid.current.setRows(arrayTableToObjectTable(
            this.basic_columns, parsed_result.basic));
        this.ref.coord_grid.current.setRows(arrayTableToObjectTable(
            this.coord_columns, parsed_result.coord));
    }

    private onClickGridToForm(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('onClickGridToForm');

        const query = generateQuery({
            basic: objectTableToArrayTable(
                this.basic_columns,
                this.ref.basic_grid.current.getRows()),
            coord: objectTableToArrayTable(
                this.coord_columns,
                this.ref.coord_grid.current.getRows())
        });

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
                    columns={this.basic_columns}
                    title='Basic'
                    ref={this.ref.basic_grid} />
                <Grid
                    columns={this.coord_columns}
                    title='Coord'
                    ref={this.ref.coord_grid} />
            </div>
        );
    }
}