import * as React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/webpack-resolver';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface State { }

export interface Props {
    onChange: (value: string) => void;
    title: string;
    value: string;
}

export default class Editor extends React.Component<Props, State> {
    public constructor(props: Props, context: State) {
        super(props, context);
    }

    public render(): React.ReactNode {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <AceEditor
                    editorProps={{ $blockScrolling: true }}
                    fontSize={16}
                    maxLines={Infinity}
                    mode='json'
                    onChange={(value): void => this.props.onChange(value)}
                    showPrintMargin={false}
                    theme='textmate'
                    value={this.props.value}
                    width='100%'
                    wrapEnabled={true}
                />
            </div>
        );
    }
}
