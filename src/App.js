import React from "react";
import { EditStore } from "./contexts/tuneedit-context";
import { TunelistStore } from "./contexts/tuneselect-context.js";
import { TunecopyStore } from "./contexts/tunecopy-context.js";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import { AcceptUrl } from "./components/accept-url";
import { TuneSelect } from "./components/tune-select";
import { TuneEdit } from "./components/tune-edit";
import { TuneCopy } from "./components/tune-copy";

import "./components/main.scss";
import "font-awesome/css/font-awesome.min.css";
import "abcjs/abcjs-midi.css";
import "axios-progress-bar/dist/nprogress.css";

import { loadProgressBar } from "axios-progress-bar";

loadProgressBar();

const acceptUrl = props => {
    return <AcceptUrl {...props}/>;
};
const tuneSelect = props => {
    return <TuneSelect {...props} />;
};
const copies = props => {
    return <TuneCopy {...props} />;
};

const tuneEdit = props => {
    return <TuneEdit {...props} />;
};

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/load" />} />
                <TunelistStore>
                    <TunecopyStore>
                        <EditStore>
                            <Route
                                exact
                                path="/collect/:index"
                                component={tuneSelect}
                            />
                            <Route exact path="/load" component={acceptUrl} />
                            <Route
                                exact
                                path="/copies/:index"
                                component={copies}
                            />
                            <Route exact path="/edit" component={tuneEdit} />
                        </EditStore>
                    </TunecopyStore>
                </TunelistStore>
            </Switch>
        </BrowserRouter>
    );
};
export default App;
