import * as AgGrid from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import * as React from 'react';

import { Columns, ObjectTable } from '../logic/table-data';

export interface Props {
    columns: Columns;
    data: ObjectTable;
    title: string;
}

const defaultColDef: AgGrid.ColDef = {
    editable: true,
    filter: true,
    resizable: true,
    sortable: true,
    suppressMovable: true
};

function resize(api: AgGrid.ColumnApi): void {
    const allColumnIds = api.getAllColumns().map(
        (column: AgGrid.Column) => {
            return column.getColId();
        });
    api.autoSizeColumns(allColumnIds);
}

const Content: React.FC<Props> = (props: Props) => {
    const [agGridApi, setAgGridApi] = React.useState<AgGrid.GridApi | null | undefined>();

    React.useEffect(() => {
        if (agGridApi) {
            // Update rowData when its reference is changed
            // even if values are same.
            //
            // Refer issue #6
            // https://github.com/km45/complicated-querystring-visualizer/issues/6
            agGridApi.setRowData(props.data);
        }
    }, [props.data]);

    const columnDefs = props.columns.map((column): AgGrid.ColDef => {
        return {
            field: column.key,
            headerName: column.name
        };
    });

    return (
        <div>
            <h2>{props.title}</h2>
            <div className='ag-theme-balham'>
                <AgGridReact
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    domLayout={'autoHeight'}
                    onGridReady={
                        (event: AgGrid.GridReadyEvent): void => {
                            setAgGridApi(event.api);
                        }
                    }
                    onModelUpdated={
                        (event: AgGrid.ModelUpdatedEvent): void => {
                            if (event.columnApi) {
                                resize(event.columnApi);
                            }
                        }
                    }
                    rowData={props.data}
                />
            </div>
        </div>);
}

export default Content;
