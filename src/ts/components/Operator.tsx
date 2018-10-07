import * as React from 'react';
import * as SemanticUiReact from 'semantic-ui-react';

interface State { }

export interface Actions {
    clearFormText(): void;
    generateQuery(): void;
    openQuery(): void;
    parseQuery(): void;
}

export interface Values {
    stringifiedQuery: string;
}

export interface Props {
    actions: Actions;
    values: Values;
}

export default class Operator extends React.Component<Props, State> {
    public render() {
        return (
            <div>
                <SemanticUiReact.Form>
                    <SemanticUiReact.Button
                        content='parse'
                        icon='arrow alternate circle down'
                        onClick={(event) => this.onClickParse(event)}
                        primary={true} />
                    <SemanticUiReact.Button
                        content='generate'
                        icon='arrow alternate circle up'
                        onClick={(event) => this.onClickGenerate(event)}
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
                        onClick={(event) => this.onClickClear(event)}
                    />
                </SemanticUiReact.Form>
            </div>
        );
    }

    private onClickClear(_/*event*/: React.MouseEvent<HTMLButtonElement>) {
        // event.preventDefault();
        this.props.actions.clearFormText();
    }

    private onClickGenerate(_/*event*/: React.MouseEvent<HTMLButtonElement>) {
        // event.preventDefault();
        this.props.actions.generateQuery();
    }

    private onClickOpen(_/*event*/: React.MouseEvent<HTMLButtonElement>) {
        // event.preventDefault();
        this.props.actions.openQuery();
    }

    private onClickParse(_/*event*/: React.MouseEvent<HTMLButtonElement>) {
        // event.preventDefault();
        this.props.actions.parseQuery();
    }
}
