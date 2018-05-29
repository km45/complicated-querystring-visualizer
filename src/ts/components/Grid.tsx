import * as React from "react";
import * as ReactDataGrid from "react-data-grid";
import update from 'immutability-helper';

export interface Props { }

interface Row {
    key: string;
    value: string;
}

interface State {
    rows: Row[];
}

export class Grid extends React.Component<Props, State> {
    private _columns: ReactDataGrid.Column[];

    public constructor(props: Props, context: State) {
        super(props, context);
        this.state = ({
            rows: this.createRows()
        });
        this._columns = [
            { key: 'key', name: 'Key', editable: true },
            { key: 'value', name: 'Value', editable: true },];
    }

    private createRows = () => {
        let rows = [];
        for (let i = 0; i < 10; i++) {
            rows.push({
                key: 'key' + i,
                value: 'value' + i
            });
        }

        return rows;
    }

    private rowGetter = (i: number) => {
        return this.state.rows[i];
    }

    // TODO: Use same type Row as logic implementation
    public getRows(): Row[] {
        return this.state.rows;
    }

    // TODO: Use same type Row as logic implementation
    public setRows(rows: Row[]): void {
        this.setState({
            rows: rows
        });
    }

    private handleGridRowsUpdated = (
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

    public render() {
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