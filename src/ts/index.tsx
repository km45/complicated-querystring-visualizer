import * as React from "react";
import * as ReactDOM from "react-dom";

import FormikMain from './components/FormikMain';

import '../stylesheet/index.css';

ReactDOM.render(
    <div>
        <FormikMain query={window.location.search} />
    </div>,
    document.getElementById("content")
);
