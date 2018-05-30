import * as React from "react";
import * as ReactDataGrid from "react-data-grid";
import update from 'immutability-helper';

import { ObjectRow, ObjectTable } from '../logic/converter';

export interface Props { }

interface State {
    table: ObjectTable;
}

export class Grid extends React.Component<Props, State> {
    // TODO: Use same type as logic implementation
    private _columns: ReactDataGrid.Column[];

    public constructor(props: Props, context: State) {
        super(props, context);
        this.state = ({
            table: this.createRows()
        });
        this._columns = [
            { key: 'key', name: 'Key', editable: true },
            { key: 'value', name: 'Value', editable: true },];
    }

    private createRows = (): ObjectTable => {
        let rows: ObjectTable = [];
        for (let i = 0; i < 10; i++) {
            rows.push({
                key: 'key' + i,
                value: 'value' + i
            });
        }

        return rows;
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

    private handleGridRowsUpdated = (
        { fromRow, toRow, updated }: { fromRow: number, toRow: number, updated: any }
    ) => {
        let table = this.state.table.slice();

        for (let i = fromRow; i <= toRow; i++) {
            let rowToUpdate = table[i];
            let updatedRow = update(rowToUpdate, { $merge: updated });
            table[i] = updatedRow;
        }

        this.setState({
            table: table
        });
    };

    public render() {
        return <ReactDataGrid
            columns={this._columns}
            enableCellSelect={true}
            minHeight={500}
            onGridRowsUpdated={this.handleGridRowsUpdated}
            rowGetter={this.rowGetter}
            rowsCount={this.state.table.length}
        />;
    }
}