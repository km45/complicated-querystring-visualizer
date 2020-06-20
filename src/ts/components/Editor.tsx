import * as React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/webpack-resolver';


export interface Props {
    onChange: (value: string) => void;
    title: string;
    value: string;
}

const Content: React.FC<Props> = (props: Props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <AceEditor
                editorProps={{ $blockScrolling: true }}
                fontSize={16}
                maxLines={Infinity}
                mode='json'
                onChange={(value): void => props.onChange(value)}
                showPrintMargin={false}
                theme='textmate'
                value={props.value}
                width='100%'
                wrapEnabled={true}
            />
        </div>
    );
}

export default Content;
