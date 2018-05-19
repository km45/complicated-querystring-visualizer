import * as React from "react";
import * as ReactDOM from "react-dom";

import { Grid } from "./components/Grid";
import { Hello } from "./components/Hello";

ReactDOM.render(
    <div>
        <Hello compiler="TypeScript" framework="React" />
        <Grid compiler="TypeScript" framework="React" />
    </div>,
    document.getElementById("example")
);