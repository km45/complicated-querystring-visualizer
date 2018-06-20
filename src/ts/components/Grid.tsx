import * as React from "react";

import * as AgGrid from "ag-grid";
import { AgGridReact } from 'ag-grid-react';

import {
    Columns, ObjectTable
} from '../logic/table-data'

export interface Props {
    columns: Columns;
    title: string;
}

interface State {
    table: ObjectTable;
}

export class Grid extends React.Component<Props, State> {
    private agGridApi: AgGrid.GridApi | null = null;

    private columnDefs: AgGrid.ColDef[];
    private defaultColDef: AgGrid.ColDef;

    public constructor(props: Props, context: State) {
        super(props, context);
        this.state = ({
            table: []
        });

        this.columnDefs = props.columns.map((from) => {
            const column: AgGrid.ColDef = {
                field: from.key,
                headerName: from.name
            };
            return column;
        });

        this.defaultColDef = {
            editable: true,
            suppressMovable: true
        };
    }

    public getTable(): ObjectTable {
        return this.state.table;
    }

    public setTable(table: ObjectTable, onInit: boolean): void {
        this.setState({
            table: table
        });

        if (onInit) {
            return;
        }

        // Change reference for data even if contents are same,
        // otherwise following problem happens.
        //
        // 1. Parse url "a=b" for the first time.
        //   1.1. Allocate memory for parsed data. Call it "Data1".
        //   1.2. This class refers "Data1".
        //   1.3. AgGrid refers "Data1".
        // 2. Parse url "localhost/?a=b" for the second time.
        //   2.1. Allocate memory for parsed data. Call it "Data2".
        //   2.2. This class changes to refer "Data2"
        //        because setState() is called explicitly. (above)
        //   2.3. AgGrid remains referring "Data1"
        //        because contents are not changed.
        // 3. Edit grid data "Data2"
        // 4. Generate url from "Data1" and not used grid data.
        if (this.agGridApi === null) {
            console.error('Unexpected null object');
            return;
        }
        this.agGridApi.setRowData(table);
    }

    private resize(api: AgGrid.ColumnApi): void {
        const allColumnIds = api.getAllColumns().map(
            (column: AgGrid.Column) => {
                return column.getColId();
            });
        api.autoSizeColumns(allColumnIds);
    }

    private onGridReady(event: AgGrid.GridReadyEvent) {
        this.agGridApi = event.api;
    }

    private onModelUpdated(params: AgGrid.ModelUpdatedEvent) {
        this.resize(params.columnApi);
    }

    public render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <div className="ag-theme-balham">
                    <AgGridReact
                        columnDefs={this.columnDefs}
                        defaultColDef={this.defaultColDef}
                        enableColResize={true}
                        enableFilter={true}
                        enableSorting={true}
                        gridAutoHeight={true}
                        onGridReady={this.onGridReady.bind(this)}
                        onModelUpdated={this.onModelUpdated.bind(this)}
                        rowData={this.state.table} />
                </div>
            </div>);
    }
}