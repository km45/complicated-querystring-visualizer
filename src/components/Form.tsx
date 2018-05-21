import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

export class Form extends React.Component<HelloProps, {}> {
    onClick() {
        console.log('clicked')
    }

    render() {
        return <div><input type="text" /><button onClick={this.onClick}>change</button></div>;
    }
}