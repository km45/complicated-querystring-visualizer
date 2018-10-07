import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from 'react-redux';

import store from './store';
import BinderContainer from "./containers/Binder";
import FormContainer from './containers/Form';

import Visualizer from "./containers/Visualizer";

ReactDOM.render(
    <div>
        <ReactRedux.Provider store={store}>
            <div>
                <FormContainer />
                <BinderContainer />
                <Visualizer />
            </div>
        </ReactRedux.Provider>
    </div>,
    document.getElementById("content")
);
