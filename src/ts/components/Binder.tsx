import * as React from "react";

import { Form } from "./Form";
import { Grid } from "./Grid";

import {
    arrayTableToObjectTable,
    objectTableToArrayTable
} from '../logic/table-data'

import {
    ColumnsDefinition
} from "../logic/query-binder";

import * as UrlBinder from '../logic/url-binder';

export interface Props { }
interface State { }

// https://stackoverflow.com/questions/33796267/how-to-use-refs-in-react-with-typescript
class BinderImplRef {
    form: React.RefObject<Form> = React.createRef();
    basic_grid: React.RefObject<Grid> = React.createRef();
    coord_grid: React.RefObject<Grid> = React.createRef();
    host_grid: React.RefObject<Grid> = React.createRef();
}

export class Binder extends React.Component<Props, State> {
    private ref = new BinderImplRef();

    public constructor(props: Props, context: State) {
        super(props, context);
    }

    private onClickFormToGrid(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('onClickFormToGrid');

        if (this.ref.form.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.basic_grid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.coord_grid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.host_grid.current == null) {
            console.error('Unexpected null object');
            return;
        }

        const url = this.ref.form.current.getText();
        const parsed_result = UrlBinder.parseUrl(url);
        console.log(parsed_result);

        this.ref.basic_grid.current.setRows(arrayTableToObjectTable(
            ColumnsDefinition.basic, parsed_result.query.basic));
        this.ref.coord_grid.current.setRows(arrayTableToObjectTable(
            ColumnsDefinition.coord, parsed_result.query.coord));
        this.ref.host_grid.current.setRows(arrayTableToObjectTable(
            UrlBinder.ColumnsDefinition.host, parsed_result.host));
    }

    private onClickGridToForm(event: React.MouseEvent<HTMLInputElement>) {
        event.preventDefault();
        console.log('onClickGridToForm');

        if (this.ref.form.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.basic_grid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.coord_grid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.host_grid.current == null) {
            console.error('Unexpected null object');
            return;
        }

        const url = UrlBinder.generateUrl({
            host: objectTableToArrayTable(
                UrlBinder.ColumnsDefinition.host,
                this.ref.host_grid.current.getRows()),
            query: {
                basic: objectTableToArrayTable(
                    ColumnsDefinition.basic,
                    this.ref.basic_grid.current.getRows()),
                coord: objectTableToArrayTable(
                    ColumnsDefinition.coord,
                    this.ref.coord_grid.current.getRows())
            }
        });
        console.log(url);

        this.ref.form.current.setText(url);
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
                    columns={UrlBinder.ColumnsDefinition.host}
                    title='Host'
                    ref={this.ref.host_grid} />
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