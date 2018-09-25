import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactRedux from 'react-redux';

import store from './store';
import BinderContainer from "./containers/Binder";
import FormContainer from './containers/Form';

ReactDOM.render(
    <div>
        <ReactRedux.Provider store={store}>
            <div>
                <FormContainer />
                <BinderContainer />
            </div>
        </ReactRedux.Provider>
    </div>,
    document.getElementById("content")
);
