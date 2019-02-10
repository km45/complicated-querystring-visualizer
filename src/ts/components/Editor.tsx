import * as React from 'react';
import ReactMonacoEditor from 'react-monaco-editor';

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
        <ReactMonacoEditor
          height={window.innerHeight * 0.8}
          language='json'
          onChange={(value) => this.props.onChange(value)}
          value={this.props.value}
        />
      </div>
    );
  }
}
