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

interface Stringified {
    url: string;
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

interface State {
    stringified: Stringified;
    structured: Structured;
}

export default class Form extends React.Component<Props, State> {
    public constructor(props: Props, context: State) {
        super(props, context);

        const url = props.query.substring('?'.length);
        const parsed = parseUrl(url);
        this.state = {
            stringified: {
                url
            },
            structured: parsed
        };
    }

    public render(): React.ReactNode {
        return (
            <SemanticUiReact.Form>
                <SemanticUiReact.TextArea
                    onChange={
                        (event: React.FormEvent<HTMLTextAreaElement>): void => {
                            this.setState({
                                ...this.state,
                                stringified: {
                                    ...this.state.stringified,
                                    url: event.currentTarget.value
                                }
                            });
                        }
                    }
                    value={this.state.stringified.url}
                />
                <SemanticUiReact.Button
                    content='parse'
                    icon='arrow alternate circle down'
                    onClick={
                        (): void => {
                            const parsed = parseUrl(this.state.stringified.url);
                            this.setState({
                                stringified: this.state.stringified,
                                structured: parsed
                            });
                        }
                    }
                    primary={true} />
                <SemanticUiReact.Button
                    content='generate'
                    icon='arrow alternate circle up'
                    onClick={
                        (): void => {
                            const generated = generateUrl(this.state.structured);
                            this.setState({
                                stringified: {
                                    url: generated
                                },
                                structured: this.state.structured
                            });
                        }
                    }
                    secondary={true} />
                <SemanticUiReact.Button
                    content='open'
                    icon='external'
                    positive={true}
                    onClick={
                        (): void => {
                            openQuery(this.state.stringified.url);
                        }
                    } />
                <SemanticUiReact.Button
                    content='clear'
                    icon='trash'
                    negative={true}
                    onClick={
                        (): void => {
                            this.setState({
                                ...this.state,
                                stringified: {
                                    ...this.state.stringified,
                                    url: ''
                                }
                            });
                        }
                    }
                />
                <Grid
                    columns={UrlBinder.ColumnsDefinition.host}
                    data={this.state.structured.host}
                    title='Host'
                />
                <Grid
                    columns={ColumnsDefinition.basic}
                    data={this.state.structured.basic}
                    title='Basic'
                />
                <Grid
                    columns={ColumnsDefinition.coord}
                    data={this.state.structured.coord}
                    title='Coord'
                />
                <Grid
                    columns={ColumnsDefinition.libs}
                    data={this.state.structured.libs}
                    title='Libs'
                />
                <Editor
                    onChange={
                        (value: string): void => {
                            this.setState({
                                ...this.state,
                                structured: {
                                    ...this.state.structured,
                                    json: value
                                }
                            });
                        }
                    }
                    title='JsonValueParameters'
                    value={this.state.structured.json}
                />
                <Editor
                    onChange={
                        (value: string): void => {
                            this.setState({
                                ...this.state,
                                structured: {
                                    ...this.state.structured,
                                    nested: value
                                }
                            });
                        }
                    }
                    title='NestedParameters'
                    value={this.state.structured.nested}
                />
            </SemanticUiReact.Form>
        );
    }
}

interface ObjectTables {
    basic: ObjectTable;
    coord: ObjectTable;
    host: ObjectTable;
    json: string;
    libs: ObjectTable;
    nested: string;
}
