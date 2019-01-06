import * as React from "react";
import * as ReactDOM from "react-dom";

import Form from './components/Form';

import '../stylesheet/index.css';

ReactDOM.render(
    <div>
        <Form query={window.location.search} />
    </div>,
    document.getElementById("content")
);
