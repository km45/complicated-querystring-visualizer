import * as AgGrid from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { Columns, ObjectTable } from '../logic/table-data';

interface State { }

export interface Props {
    columns: Columns;
    data: ObjectTable;
    title: string;
}

const defaultColDef: AgGrid.ColDef = {
    editable: true,
    filter: true,
    sortable: true,
    resizable:true,
    suppressMovable: true
};

export default class Grid extends React.Component<Props, State> {
    private agGridApi: AgGrid.GridApi | null | undefined = null;

    private columnDefs: AgGrid.ColDef[];

    public constructor(props: Props, context: State) {
        super(props, context);

        this.columnDefs = props.columns.map((column): AgGrid.ColDef => {
            return {
                field: column.key,
                headerName: column.name
            };
        });
    }

    public componentDidUpdate(prevProps: Props, _2/*prevState*/: State, _3/*snapshot*/: any) {
        if (prevProps.data !== this.props.data) {
            // Update rowData when its reference is changed
            // even if values are same.
            //
            // Refer issue #6
            // https://github.com/km45/complicated-querystring-visualizer/issues/6
            if (this.agGridApi) {
                this.agGridApi.setRowData(this.props.data);
            }
        }
    }

    public render() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <div className='ag-theme-balham'>
                    <AgGridReact
                        columnDefs={this.columnDefs}
                        defaultColDef={defaultColDef}
                        domLayout={'autoHeight'}
                        onGridReady={this.onGridReady.bind(this)}
                        onModelUpdated={this.onModelUpdated.bind(this)}
                        rowData={this.props.data}
                    />
                </div>
            </div>);
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

    private onModelUpdated(event: AgGrid.ModelUpdatedEvent) {
        if (event.columnApi) {
            this.resize(event.columnApi);
        }
    }
}
