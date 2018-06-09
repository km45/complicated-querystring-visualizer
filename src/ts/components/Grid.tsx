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
    private ag_columns: AgGrid.ColDef[];
    private ag_defaultColDef: AgGrid.ColDef;

    public constructor(props: Props, context: State) {
        super(props, context);
        this.state = ({
            table: []
        });

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

    public getRows(): ObjectTable {
        return this.state.table;
    }

    public setRows(table: ObjectTable): void {
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
                <div className="ag-theme-balham">
                    <AgGridReact
                        columnDefs={this.ag_columns}
                        domLayout="autoHeight"
                        defaultColDef={this.ag_defaultColDef}
                        enableColResize={true}
                        enableFilter={true}
                        enableSorting={true}
                        onModelUpdated={this.onModelUpdated.bind(this)}
                        rowData={this.state.table} />
                </div>
            </div>);
    }
}