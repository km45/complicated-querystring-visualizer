import * as React from 'react';
import ReactAce from 'react-ace';

import "brace/mode/json";
import "brace/theme/textmate";

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
          fontSize={16}
          // height={window.innerHeight * 0.8}
          mode="json"
          onChange={(value) => this.props.onChange(value)}
          showPrintMargin={false}
          theme="textmate"
          value={this.props.value}
          width="100%"
          wrapEnabled={true}
        />
      </div>
    );
  }
}
