import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { TuneCopyContext, actions } from "../contexts/tunecopy-context.js";

import { useLayoutHelper } from "../helpers/layoutHelper";
import { actionCreator } from "../helpers/reducer";
import { AbcControls } from "./abc-controls";
import { downloadTunebook } from "../services/download-tunebook";
import Button from "@material-ui/core/Button";
import { TopBar } from './topbar.js'

const controls = () => {
    const { state, dispatch } = useContext(TuneCopyContext);

    return (
        <React.Fragment>
            <li>
                <label>Copies</label>
            </li>
            <li className="fill">
                <select
                    onChange={e =>
                        dispatch(
                            actionCreator(
                                actions.selectTuneByIndex,
                                e.target.value
                            )
                        )
                    }
                    value={state.tuneIndex}>
                    {state.titles.map((t, i) => (
                        <option key={i} value={i}>
                            {t}
                        </option>
                    ))}
                </select>
            </li>
            <li>
                <Button variant="contained" color="primary"
                    onClick={() => {
                        downloadTunebook(state.tunes, "tunebook");
                    }}>
                    <i className="fa fa-download" /> Download
                </Button>
            </li>
        </React.Fragment>
    );
};

const TuneCopyControls = () => {
    return (
        <TopBar>
        <ul role="navigation">
            <li>
                <span role="button">
                    <Link to="/collect/0">Collect</Link>
                </span>
            </li>
            {controls()}
        </ul>
        </TopBar>
    );
};

export const TuneCopy = ({ match: { params } }) => {
    const { fixedElement, scrollingElement } = useLayoutHelper();
    const { state } = useContext(TuneCopyContext);

    return (
        <Fragment>
            <div ref={fixedElement} className="controlbar">
                <TuneCopyControls />
            </div>
            <div ref={scrollingElement} className="container">
                <AbcControls readOnly="true" abcText={state.tune.abc} />
            </div>
        </Fragment>
    );
};
