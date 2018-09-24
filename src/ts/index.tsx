import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from 'react-redux';

import store from './store';
import BinderContainer from "./containers/Binder";

ReactDOM.render(
    <div>
        <ReactRedux.Provider store={store}>
            <BinderContainer />
        </ReactRedux.Provider>
    </div>,
    document.getElementById("content")
);
