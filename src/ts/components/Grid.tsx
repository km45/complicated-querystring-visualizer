import * as React from "react";
import * as ReactDataGrid from "react-data-grid";
import update from 'immutability-helper';

import * as AgGrid from "ag-grid";
import { AgGridReact } from 'ag-grid-react';

import {
    Columns, ObjectRow, ObjectTable
} from '../logic/table-data'

export interface Props {
    columns: Columns;
    title: string;
}

interface State {
    table: ObjectTable;
}

export class Grid extends React.Component<Props, State> {
    private columns: ReactDataGrid.Column[];

    private ag_columns: AgGrid.ColDef[];
    private ag_defaultColDef: AgGrid.ColDef;

    private rowHeight: number = 35;
    private headerRowHeight: number = this.rowHeight;

    public constructor(props: Props, context: State) {
        super(props, context);
        this.state = ({
            table: []
        });
        this.columns = this.createColumns(props.columns);

        this.ag_columns = props.columns.map((from) => {
            const column: AgGrid.ColDef = {
                field: from.key,
                headerName: from.name
            };
            return column;
        });
        this.ag_defaultColDef = {
            editable: true,
            suppressMovable: true
        };
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

    private resize(api: AgGrid.ColumnApi): void {
        const allColumnIds = api.getAllColumns().map((column: AgGrid.Column) => {
            return column.getColId();
        });
        api.autoSizeColumns(allColumnIds);
    }

    private onModelUpdated(params: AgGrid.ModelUpdatedEvent) {
        this.resize(params.columnApi);
    }

    public render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <ReactDataGrid
                    columns={this.columns}
                    enableCellSelect={true}
                    headerRowHeight={this.headerRowHeight}
                    rowHeight={this.rowHeight}
                    minHeight={this.rowHeight * this.state.table.length + this.headerRowHeight}
                    onGridRowsUpdated={(event) => this.handleGridRowsUpdated(event)}
                    rowGetter={(i) => this.rowGetter(i)}
                    rowsCount={this.state.table.length} />
                <div className="ag-theme-balham">
                    <AgGridReact
                        columnDefs={this.ag_columns}
                        domLayout="autoHeight"
                        defaultColDef={this.ag_defaultColDef}
                        enableColResize={true}
                        enableFilter={true}
                        enableSorting={true}
                        onModelUpdated={(event) => this.onModelUpdated(event)}
                        rowData={this.state.table} />
                </div>
            </div>);
    }
}