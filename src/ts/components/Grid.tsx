import * as React from "react";
import * as ReactDataGrid from "react-data-grid";
import update from 'immutability-helper';

import {
    Columns, ObjectRow, ObjectTable
} from '../logic/table-data'

export interface Props {
    columns: Columns;
}

interface State {
    table: ObjectTable;
}

export class Grid extends React.Component<Props, State> {
    private columns: ReactDataGrid.Column[];

    private rowHeight: number = 35;
    private headerRowHeight: number = this.rowHeight;

    public constructor(props: Props, context: State) {
        super(props, context);
        this.state = ({
            table: []
        });
        this.columns = this.createColumns(props.columns);
    }

    private createColumns(columns: Columns): ReactDataGrid.Column[] {
        return columns.map(
            (column): ReactDataGrid.Column => {
                return {
                    key: column.key,
                    name: column.name,
                    editable: true,
                    resizable: true
                };
            }
        );
    }

    private rowGetter = (i: number) => {
        return this.state.table[i];
    }

    public getRows(): ObjectTable {
        return this.state.table;
    }

    public setRows(table: ObjectTable): void {
        this.setState({
            table: table
        });
    }

    private handleGridRowsUpdated(e: ReactDataGrid.GridRowsUpdatedEvent): void {
        let table = this.state.table.slice();

        for (let i = e.fromRow; i <= e.toRow; i++) {
            let rowToUpdate = table[i];
            let updatedRow = update(rowToUpdate, { $merge: e.updated });
            table[i] = updatedRow;
        }

        this.setState({
            table: table
        });
    }

    public render() {
        return <ReactDataGrid
            columns={this.columns}
            enableCellSelect={true}
            headerRowHeight={this.headerRowHeight}
            rowHeight={this.rowHeight}
            minHeight={this.rowHeight * this.state.table.length + this.headerRowHeight}
            onGridRowsUpdated={(event) => this.handleGridRowsUpdated(event)}
            rowGetter={(i) => this.rowGetter(i)}
            rowsCount={this.state.table.length}
        />;
    }
}