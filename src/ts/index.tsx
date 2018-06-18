import * as React from "react";
import * as ReactDOM from "react-dom";

import { Binder } from "./components/Binder";

ReactDOM.render(
    <div>
        <Binder query={window.location.search} />
    </div>,
    document.getElementById("content")
);