import * as React from 'react';
import ReactAce from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/webpack-resolver';

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

  public render() {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <ReactAce
          editorProps={{ $blockScrolling: true }}
          fontSize={16}
          maxLines={Infinity}
          mode='json'
          onChange={(value) => this.props.onChange(value)}
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
