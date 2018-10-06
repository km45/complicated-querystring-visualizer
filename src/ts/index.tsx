import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from 'react-redux';

import store from './store';
import BinderContainer from "./containers/Binder";
import FormContainer from './containers/Form';
import Grid from './containers/Grid';

import { ColumnsDefinition } from './logic/query-binder';

ReactDOM.render(
    <div>
        <ReactRedux.Provider store={store}>
            <div>
                <FormContainer />
                <BinderContainer />
                <Grid
                    columns={ColumnsDefinition.basic}
                    title='Basic' />
            </div>
        </ReactRedux.Provider>
    </div>,
    document.getElementById("content")
);
