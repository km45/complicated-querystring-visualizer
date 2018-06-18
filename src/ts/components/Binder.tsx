import * as React from "react";

import * as SemanticUiReact from "semantic-ui-react";

import { Form } from "./Form";
import { Grid } from "./Grid";

import {
    arrayTableToObjectTable,
    objectTableToArrayTable,
    ObjectTable
} from '../logic/table-data'

import {
    ColumnsDefinition
} from "../logic/query-binder";

import * as UrlBinder from '../logic/url-binder';

export interface Props {
    query: string;
}

interface State { }

// https://stackoverflow.com/questions/33796267/how-to-use-refs-in-react-with-typescript
class BinderImplRef {
    form: React.RefObject<Form> = React.createRef();
    basicGrid: React.RefObject<Grid> = React.createRef();
    coordGrid: React.RefObject<Grid> = React.createRef();
    hostGrid: React.RefObject<Grid> = React.createRef();
}

interface BinderImplTables {
    basic: ObjectTable;
    coord: ObjectTable;
    host: ObjectTable;
}

function parseUrl(url: string): BinderImplTables {
    const parsed = UrlBinder.parseUrl(url);
    console.log(parsed);

    return {
        basic: arrayTableToObjectTable(
            ColumnsDefinition.basic, parsed.query.basic),
        coord: arrayTableToObjectTable(
            ColumnsDefinition.coord, parsed.query.coord),
        host: arrayTableToObjectTable(
            UrlBinder.ColumnsDefinition.host, parsed.host)
    };
}

function generateUrl(tables: BinderImplTables): string {
    return UrlBinder.generateUrl({
        host: objectTableToArrayTable(
            UrlBinder.ColumnsDefinition.host,
            tables.host),
        query: {
            basic: objectTableToArrayTable(
                ColumnsDefinition.basic,
                tables.basic),
            coord: objectTableToArrayTable(
                ColumnsDefinition.coord,
                tables.coord)
        }
    });
}

export class Binder extends React.Component<Props, State> {
    private ref = new BinderImplRef();

    public constructor(props: Props, context: State) {
        super(props, context);
    }

    private onClickFormToGrid(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log('onClickFormToGrid');

        if (this.ref.form.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.basicGrid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.coordGrid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.hostGrid.current == null) {
            console.error('Unexpected null object');
            return;
        }

        const url = this.ref.form.current.getText();
        const tables = parseUrl(url);

        this.ref.basicGrid.current.setTable(tables.basic);
        this.ref.coordGrid.current.setTable(tables.coord);
        this.ref.hostGrid.current.setTable(tables.host);
    }

    private onClickGridToForm(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log('onClickGridToForm');

        if (this.ref.form.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.basicGrid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.coordGrid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.hostGrid.current == null) {
            console.error('Unexpected null object');
            return;
        }

        const url = generateUrl({
            basic: this.ref.basicGrid.current.getTable(),
            coord: this.ref.coordGrid.current.getTable(),
            host: this.ref.hostGrid.current.getTable()
        });
        console.log(url);

        this.ref.form.current.setText(url);
    }

    private onClickClear(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (this.ref.form.current === null) {
            console.error('Unexpected null object');
            return;
        }

        this.ref.form.current.setText('');
    }

    public render() {
        return (
            <div>
                <Form ref={this.ref.form} />
                <SemanticUiReact.Form>
                    <SemanticUiReact.Button
                        content='parse'
                        onClick={(event) => this.onClickFormToGrid(event)} />
                    <SemanticUiReact.Button
                        content='generate'
                        onClick={(event) => this.onClickGridToForm(event)} />
                    <SemanticUiReact.Button
                        content='clear'
                        onClick={(event) => this.onClickClear(event)} />
                </SemanticUiReact.Form>
                <Grid
                    columns={UrlBinder.ColumnsDefinition.host}
                    title='Host'
                    ref={this.ref.hostGrid} />
                <Grid
                    columns={ColumnsDefinition.basic}
                    title='Basic'
                    ref={this.ref.basicGrid} />
                <Grid
                    columns={ColumnsDefinition.coord}
                    title='Coord'
                    ref={this.ref.coordGrid} />
            </div>
        );
    }

    public componentDidMount(): void {
        if (this.ref.form.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.basicGrid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.coordGrid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.hostGrid.current == null) {
            console.error('Unexpected null object');
            return;
        }

        const query = ((query: string): string => {
            if (!query) {
                return '';
            }

            return query.substring('?'.length);
        })(this.props.query);

        const tables = parseUrl(query);

        this.ref.form.current.setText(query);

        this.ref.basicGrid.current.setTable(tables.basic);
        this.ref.coordGrid.current.setTable(tables.coord);
        this.ref.hostGrid.current.setTable(tables.host);
    }
}