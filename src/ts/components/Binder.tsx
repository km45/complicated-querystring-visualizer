import * as React from 'react';
import * as SemanticUiReact from 'semantic-ui-react';

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

import { setBasicTable, setCoordTable, setHostTable } from '../modules/StructuredQuery';

interface State { }

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
            </div>
        );
    }

    public componentDidMount(): void {
        const query = ((q: string): string => {
            if (!q) {
                return '';
            }

            return q.substring('?'.length);
        })(window.location.search);

        const tables = parseUrl(query);

        this.props.dispatch(setText(query));

        this.props.dispatch(setBasicTable(tables.basic));
        this.props.dispatch(setCoordTable(tables.coord));
        this.props.dispatch(setHostTable(tables.host));
    }

    private onClickFormToGrid(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log('onClickFormToGrid');

        const url = this.props.text;
        const tables = parseUrl(url);

        this.props.dispatch(setBasicTable(tables.basic));
        this.props.dispatch(setCoordTable(tables.coord));
        this.props.dispatch(setHostTable(tables.host));
    }

    private onClickGridToForm(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        console.log('onClickGridToForm');

        const url = generateUrl({
            basic: this.props.basicTable,
            coord: this.props.coordTable,
            host: this.props.hostTable
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
