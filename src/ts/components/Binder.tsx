import * as React from "react";

import { Form } from "./Form";
import { Grid } from "./Grid";

import {
    arrayTableToObjectTable,
    objectTableToArrayTable
} from '../logic/table-data'

import {
    generateQuery,
    parseQuery,
    ColumnsDefinition
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

    public constructor(props: Props, context: State) {
        super(props, context);
    }

    private onClickFormToGrid(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('onClickFormToGrid');

        let query = this.ref.form.current.getText();
        let parsed_result = parseQuery(query);
        console.log(parsed_result);

        this.ref.basic_grid.current.setRows(arrayTableToObjectTable(
            ColumnsDefinition.basic, parsed_result.basic));
        this.ref.coord_grid.current.setRows(arrayTableToObjectTable(
            ColumnsDefinition.coord, parsed_result.coord));
    }

    private onClickGridToForm(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('onClickGridToForm');

        const query = generateQuery({
            basic: objectTableToArrayTable(
                ColumnsDefinition.basic,
                this.ref.basic_grid.current.getRows()),
            coord: objectTableToArrayTable(
                ColumnsDefinition.coord,
                this.ref.coord_grid.current.getRows())
        });
        console.log(query);

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
                    columns={ColumnsDefinition.basic}
                    title='Basic'
                    ref={this.ref.basic_grid} />
                <Grid
                    columns={ColumnsDefinition.coord}
                    title='Coord'
                    ref={this.ref.coord_grid} />
            </div>
        );
    }
}