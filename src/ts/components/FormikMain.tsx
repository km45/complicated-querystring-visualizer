import * as SemanticUiReact from 'semantic-ui-react';
import * as React from 'react';
import FormikGrid from './FormikGrid';
import { ObjectTable } from '../logic/table-data';
import { ColumnsDefinition } from '../logic/query-binder';
import { parseUrl, generateUrl } from '../containers/Operator';
import * as UrlBinder from '../logic/url-binder';

interface Stringified {
    url: string;
}

interface Structured {
    basic: ObjectTable;
    coord: ObjectTable;
    host: ObjectTable;
    libs: ObjectTable;
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

export default class FormikMain extends React.Component<Props, State> {
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

    public render() {
        return (
            <SemanticUiReact.Form>
                <SemanticUiReact.TextArea
                    autoHeight={true}
                    onChange={(event) => { this.onChangeStringifiedTextArea(event) }}
                    value={this.state.stringified.url}
                />
                <SemanticUiReact.Button
                    content='parse'
                    icon='arrow alternate circle down'
                    onClick={(event) => this.onClickOperationParse(event)}
                    primary={true} />
                <SemanticUiReact.Button
                    content='generate'
                    icon='arrow alternate circle up'
                    onClick={(event) => this.onClickOperationGenerate(event)}
                    secondary={true} />
                <SemanticUiReact.Button
                    content='open'
                    icon='external'
                    positive={true}
                    onClick={(event) => this.onClickOperationOpen(event)} />
                <SemanticUiReact.Button
                    content='clear'
                    icon='trash'
                    negative={true}
                    onClick={(event) => this.onClickOperationClear(event)}
                />
                <FormikGrid
                    columns={UrlBinder.ColumnsDefinition.host}
                    data={this.state.structured.host}
                    title='Host'
                />
                <FormikGrid
                    columns={ColumnsDefinition.basic}
                    data={this.state.structured.basic}
                    title='Basic'
                />
                <FormikGrid
                    columns={ColumnsDefinition.coord}
                    data={this.state.structured.coord}
                    title='Coord'
                />
                <FormikGrid
                    columns={ColumnsDefinition.libs}
                    data={this.state.structured.libs}
                    title='Libs'
                />
            </SemanticUiReact.Form>
        );
    }

    private onChangeStringifiedTextArea(event: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({
            ...this.state,
            stringified: {
                ...this.state.stringified,
                url: event.currentTarget.value
            }
        });
    }

    private onClickOperationClear(_/*event*/: React.MouseEvent<HTMLButtonElement>) {
        this.setState({
            ...this.state,
            stringified: {
                ...this.state.stringified,
                url: ''
            }
        });
    }

    private onClickOperationOpen(_/*event*/: React.MouseEvent<HTMLButtonElement>) {
        openQuery(this.state.stringified.url);
    }

    private onClickOperationParse(_/*event*/: React.MouseEvent<HTMLButtonElement>) {
        const parsed = parseUrl(this.state.stringified.url);
        this.setState({
            stringified: this.state.stringified,
            structured: parsed
        });
    }

    private onClickOperationGenerate(_/*event*/: React.MouseEvent<HTMLButtonElement>) {
        const generated = generateUrl(this.state.structured);

        this.setState({
            stringified: {
                url: generated
            },
            structured: this.state.structured
        });
    }
}
