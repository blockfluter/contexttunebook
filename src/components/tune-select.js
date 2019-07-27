import React, { useEffect, useContext, Fragment } from "react";
import { Link as RouterLink } from "react-router-dom";
import { TuneSelectContext, actions } from "../contexts/tuneselect-context.js";
import { TopBar } from "./topbar";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import {
    TuneCopyContext,
    actions as copyActions
} from "../contexts/tunecopy-context.js";
import {
    EditContext,
    actions as editActions
} from "../contexts/tuneedit-context.js";

import { useLayoutHelper } from "../helpers/layoutHelper";
import { actionCreator } from "../helpers/reducer";
import { AbcControls } from "./abc-controls";

const controls = history => {
    const { state, dispatch } = useContext(TuneSelectContext);
    const copyContext = useContext(TuneCopyContext);
    const editContext = useContext(EditContext);

    return (<Fragment>
        <li>
            <span
                className="fa fa-arrow-left"
                enabled={(state.tuneIndex > 0).toString()}
                onClick={() =>
                    dispatch(actionCreator(actions.selectPrevTune))
                }
            />
        </li>
        <li>
            <span
                className="fa fa-arrow-right"
                enabled={(
                    state.tuneIndex <
                    state.titles.length - 1
                ).toString()}
                onClick={() =>
                    dispatch(actionCreator(actions.selectNextTune))
                }
            />
        </li>
        <li>
            <label>Originals</label>
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
            {state.canCopy && (
                <Button variant="contained" color="primary"
                    onClick={() =>
                        copyContext.dispatch(
                            actionCreator(copyActions.addCopy, state.tune)
                        )
                    }>
                    <i className="fa fa-copy" /> Copy
                    </Button>
            )}
        </li>
        <li>
            <Button variant="text"><RouterLink to="/copies/0">Copies</RouterLink></Button>
        </li>
        <li>
            <Button variant="contained" color="primary"
                onClick={() => {
                    editContext.dispatch(actionCreator(editActions.setAbcText, state.tune));
                    history.push("/edit");
                }}>
                Edit
                </Button>
        </li>
    </Fragment>

    );
};

const TuneSelectControls = ({ history }) => {
    const { state } = useContext(TuneSelectContext);

    return (
        <TopBar>
            <ul role="navigation">
                <li>
                    <Button variant="text">
                        <RouterLink to="/load">Load</RouterLink>
                    </Button>
                </li>
                {state.titles.length > 0 && controls(history)}
            </ul>
        </TopBar>
    );
};

export const TuneSelect = ({ history, match: { params } }) => {
    const { fixedElement, scrollingElement } = useLayoutHelper();
    const { state, dispatch } = useContext(TuneSelectContext);
    console.log(history);
    useEffect(() => {
        dispatch(actionCreator(actions.selectTunebookByIndex, params.index));
    }, params.index);

    return (
        <Fragment>
            <div ref={fixedElement} className="controlbar">
                <TuneSelectControls history={history} />
            </div>
            <div ref={scrollingElement} className="container">
                <AbcControls readOnly="true" abcText={state.tune.abc} />
            </div>
            }
        </Fragment>
    );
};
