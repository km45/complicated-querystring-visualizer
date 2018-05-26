import * as React from "react";
import * as ReactDataGrid from "react-data-grid";
import update from 'immutability-helper';

export interface GridProps { compiler: string; framework: string; }

class GridState {
    rows: any
}

export class Grid extends React.Component<GridProps, GridState> {
    _columns: any;

    constructor(props: any, context: any) {
        super(props, context);
        this.state = ({
            rows: this.createRows()
        });
        this._columns = [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title', editable: true },
            { key: 'count', name: 'Count', editable: true }];
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

        return rows;
    }

    rowGetter = (i: number) => {
        return this.state.rows[i];
    }

    handleGridRowsUpdated = (
        { fromRow, toRow, updated }: { fromRow: number, toRow: number, updated: any }
    ) => {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = rows[i];
            let updatedRow = update(rowToUpdate, { $merge: updated });
            rows[i] = updatedRow;
        }

        this.setState({ rows });
    };

    render() {
        return <ReactDataGrid
            columns={this._columns}
            enableCellSelect={true}
            minHeight={500}
            onGridRowsUpdated={this.handleGridRowsUpdated}
            rowGetter={this.rowGetter}
            rowsCount={this.state.rows.length}
        />;
    }
}