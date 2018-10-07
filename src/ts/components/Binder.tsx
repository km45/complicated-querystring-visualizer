import * as React from 'react';

import {
    arrayTableToObjectTable,
    ObjectTable
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

export class Binder extends React.Component<Props, State> {
    public constructor(props: Props, context: State) {
        super(props, context);
    }

    public render() {
        return (
            <div></div>
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
}
