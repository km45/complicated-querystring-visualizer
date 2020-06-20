import * as React from 'react';
import * as SemanticUiReact from 'semantic-ui-react';

import { ColumnsDefinition } from '../logic/query-binder';
import { arrayTableToObjectTable, ObjectTable, objectTableToArrayTable } from '../logic/table-data';
import * as UrlBinder from '../logic/url-binder';
import Editor from './Editor';
import Grid from './Grid';

function generateUrl(tables: ObjectTables): string {
    return UrlBinder.generateUrl({
        host:
            objectTableToArrayTable(UrlBinder.ColumnsDefinition.host, tables.host),
        query: {
            basic: objectTableToArrayTable(ColumnsDefinition.basic, tables.basic),
            coord: objectTableToArrayTable(ColumnsDefinition.coord, tables.coord),
            json: tables.json,
            libs: objectTableToArrayTable(ColumnsDefinition.libs, tables.libs),
            nested: tables.nested
        }
    });
}

// format "json" and return it if it is valid JSON, otherwise return "json"
function formatJsonIfValid(json: string): string {
    const indent = 4;

    let ret = json;
    try {
        ret = JSON.stringify(JSON.parse(json), undefined, indent);
    } catch (e) {
        console.error(e);
    }

    return ret;
}

function parseUrl(url: string): ObjectTables {
    const parsed = UrlBinder.parseUrl(url);

    return {
        basic: arrayTableToObjectTable(ColumnsDefinition.basic, parsed.query.basic),
        coord: arrayTableToObjectTable(ColumnsDefinition.coord, parsed.query.coord),
        host: arrayTableToObjectTable(UrlBinder.ColumnsDefinition.host, parsed.host),
        json: formatJsonIfValid(parsed.query.json),
        libs: arrayTableToObjectTable(ColumnsDefinition.libs, parsed.query.libs),
        nested: formatJsonIfValid(parsed.query.nested)
    };
}

interface Structured {
    basic: ObjectTable;
    coord: ObjectTable;
    host: ObjectTable;
    json: string;
    libs: ObjectTable;
    nested: string;
}

function openQuery(url: string): void {
    console.group('Open query');
    console.log(url);
    console.groupEnd();

    window.open(url, '_blank');
}

interface Props {
    query: string;
}

const Content: React.FC<Props> = (props: Props) => {
    const url = props.query.substring('?'.length);
    const parsed = parseUrl(url);

    const [stringified, setStringified] = React.useState<string>(url);
    const [structured, setStructured] = React.useState<Structured>(parsed);

    return (
        <SemanticUiReact.Form>
            <SemanticUiReact.TextArea
                onChange={
                    (event: React.FormEvent<HTMLTextAreaElement>): void => {
                        setStringified(event.currentTarget.value);
                    }
                }
                value={stringified}
            />
            <SemanticUiReact.Button
                content='parse'
                icon='arrow alternate circle down'
                onClick={
                    (): void => {
                        const parsed = parseUrl(stringified);
                        setStructured(parsed);
                    }
                }
                primary={true} />
            <SemanticUiReact.Button
                content='generate'
                icon='arrow alternate circle up'
                onClick={
                    (): void => {
                        const generated = generateUrl(structured);
                        setStringified(generated);
                    }
                }
                secondary={true} />
            <SemanticUiReact.Button
                content='open'
                icon='external'
                positive={true}
                onClick={
                    (): void => {
                        openQuery(stringified);
                    }
                } />
            <SemanticUiReact.Button
                content='clear'
                icon='trash'
                negative={true}
                onClick={
                    (): void => {
                        setStringified('');
                    }
                }
            />
            <Grid
                columns={UrlBinder.ColumnsDefinition.host}
                data={structured.host}
                title='Host'
            />
            <Grid
                columns={ColumnsDefinition.basic}
                data={structured.basic}
                title='Basic'
            />
            <Grid
                columns={ColumnsDefinition.coord}
                data={structured.coord}
                title='Coord'
            />
            <Grid
                columns={ColumnsDefinition.libs}
                data={structured.libs}
                title='Libs'
            />
            <Editor
                onChange={
                    (value: string): void => {
                        setStructured({
                            ...structured,
                            json: value
                        });
                    }
                }
                title='JsonValueParameters'
                value={structured.json}
            />
            <Editor
                onChange={
                    (value: string): void => {
                        setStructured({
                            ...structured,
                            nested: value
                        });
                    }
                }
                title='NestedParameters'
                value={structured.nested}
            />
        </SemanticUiReact.Form>
    );
}

export default Content;

interface ObjectTables {
    basic: ObjectTable;
    coord: ObjectTable;
    host: ObjectTable;
    json: string;
    libs: ObjectTable;
    nested: string;
}
