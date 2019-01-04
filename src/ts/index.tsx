import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from 'react-redux';

import store from './store';
import Form from './containers/Form';
import Operator from './containers/Operator';
import Visualizer from "./containers/Visualizer";
import FormikMain from './components/FormikMain';

import '../stylesheet/index.css';

ReactDOM.render(
    <div>
        <FormikMain />
        <ReactRedux.Provider store={store}>
            <div>
                <Form />
                <Operator />
                <Visualizer />
            </div>
        </ReactRedux.Provider>
    </div>,
    document.getElementById("content")
);
