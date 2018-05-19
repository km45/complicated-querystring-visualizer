import * as React from "react";
import * as ReactDataGrid from "react-data-grid";

export interface GridProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Grid extends React.Component<GridProps, {}> {
    _columns: any;
    _rows: any;

    constructor(props: any, context: any) {
        super(props, context);
        this.createRows();
        this._columns = [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title' },
            { key: 'count', name: 'Count' }];

        this.state = null;
    }

    createRows = () => {
        let rows = [];
        for (let i = 1; i < 1000; i++) {
            rows.push({
                id: i,
                title: 'Title ' + i,
                count: i * 1000
            });
        }

        this._rows = rows;
    }

    rowGetter = (i: number) => {
        return this._rows[i];
    }

    render() {
        return <ReactDataGrid
            columns={this._columns}
            rowGetter={this.rowGetter}
            rowsCount={this._rows.length}
            minHeight={500} />;
        // return <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}