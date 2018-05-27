import * as React from "react";
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";
import { Binder } from "./components/Binder";

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
        <Binder />
    </div>,
    document.getElementById("example")
);