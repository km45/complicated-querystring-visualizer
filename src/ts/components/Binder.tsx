import * as React from 'react';
import * as SemanticUiReact from 'semantic-ui-react';

import { Grid as OldGrid } from './OldGrid';

import {
    arrayTableToObjectTable,
    ObjectTable,
    objectTableToArrayTable
} from '../logic/table-data';

import {
    ColumnsDefinition
} from '../logic/query-binder';

import * as UrlBinder from '../logic/url-binder';

import { Props } from '../containers/Binder';
import { setText } from '../modules/StringifiedQuery';

import { setTable } from '../modules/StructuredQuery';

interface State { }

// https://stackoverflow.com/questions/33796267/how-to-use-refs-in-react-with-typescript
class BinderImplRef {
    public coordGrid: React.RefObject<OldGrid> = React.createRef();
    public hostGrid: React.RefObject<OldGrid> = React.createRef();
}

interface BinderImplTables {
    basic: ObjectTable;
    coord: ObjectTable;
    host: ObjectTable;
}

function parseUrl(url: string): BinderImplTables {
    const parsed = UrlBinder.parseUrl(url);
    console.log(parsed);

    return {
        basic: arrayTableToObjectTable(
            ColumnsDefinition.basic, parsed.query.basic),
        coord: arrayTableToObjectTable(
            ColumnsDefinition.coord, parsed.query.coord),
        host: arrayTableToObjectTable(
            UrlBinder.ColumnsDefinition.host, parsed.host)
    };
}

function generateUrl(tables: BinderImplTables): string {
    return UrlBinder.generateUrl({
        host: objectTableToArrayTable(
            UrlBinder.ColumnsDefinition.host,
            tables.host),
        query: {
            basic: objectTableToArrayTable(
                ColumnsDefinition.basic,
                tables.basic),
            coord: objectTableToArrayTable(
                ColumnsDefinition.coord,
                tables.coord)
        }
    });
}

export class Binder extends React.Component<Props, State> {
    private ref = new BinderImplRef();

    public constructor(props: Props, context: State) {
        super(props, context);
    }

    public render() {
        return (
            <div>
                <SemanticUiReact.Form>
                    <SemanticUiReact.Button
                        content='parse'
                        icon='arrow alternate circle down'
                        onClick={(event) => this.onClickFormToGrid(event)}
                        primary={true} />
                    <SemanticUiReact.Button
                        content='generate'
                        icon='arrow alternate circle up'
                        onClick={(event) => this.onClickGridToForm(event)}
                        secondary={true} />
                    <SemanticUiReact.Button
                        content='open'
                        icon='external'
                        positive={true}
                        onClick={(event) => this.onClickOpen(event)} />
                    <SemanticUiReact.Button
                        content='clear'
                        icon='trash'
                        negative={true}
                        onClick={(event) => this.onClickClear(event)} />
                </SemanticUiReact.Form>
                <OldGrid
                    columns={UrlBinder.ColumnsDefinition.host}
                    title='Host'
                    ref={this.ref.hostGrid} />
                <OldGrid
                    columns={ColumnsDefinition.coord}
                    title='Coord'
                    ref={this.ref.coordGrid} />
            </div>
        );
    }

    public componentDidMount(): void {
        if (this.ref.coordGrid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.hostGrid.current == null) {
            console.error('Unexpected null object');
            return;
        }

        const query = ((q: string): string => {
            if (!q) {
                return '';
            }

            return q.substring('?'.length);
        })(window.location.search);

        const tables = parseUrl(query);

        this.props.dispatch(setText(query));

        this.props.dispatch(setTable(tables.basic));
        this.ref.coordGrid.current.setTable(tables.coord, true);
        this.ref.hostGrid.current.setTable(tables.host, true);
    }

    private onClickFormToGrid(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log('onClickFormToGrid');

        if (this.ref.coordGrid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.hostGrid.current == null) {
            console.error('Unexpected null object');
            return;
        }

        const url = this.props.text;
        const tables = parseUrl(url);

        this.props.dispatch(setTable(tables.basic));
        this.ref.coordGrid.current.setTable(tables.coord, false);
        this.ref.hostGrid.current.setTable(tables.host, false);
    }

    private onClickGridToForm(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log('onClickGridToForm');

        if (this.ref.coordGrid.current === null) {
            console.error('Unexpected null object');
            return;
        }
        if (this.ref.hostGrid.current == null) {
            console.error('Unexpected null object');
            return;
        }

        const url = generateUrl({
            basic: this.props.table,
            coord: this.ref.coordGrid.current.getTable(),
            host: this.ref.hostGrid.current.getTable()
        });
        console.log(url);

        this.props.dispatch(setText(url));
    }

    private onClickOpen(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        const url = this.props.text;
        console.log('Open link: ' + url);

        window.open(url, '_blank');
    }

    private onClickClear(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        this.props.dispatch(setText(''));
    }
}
