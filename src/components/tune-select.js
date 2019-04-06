import React, { useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { TuneSelectContext, actions } from "../contexts/tuneselect-context.js";

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

    return (
        <Fragment>
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
                    <button
                        onClick={() =>
                            copyContext.dispatch(
                                actionCreator(copyActions.addCopy, state.tune)
                            )
                        }>
                        <i className="fa fa-copy" /> Copy
                    </button>
                )}
            </li>
            <li>
                <Link to="/copies/0">Copies</Link>
            </li>
            <li>
                <button
                    onClick={() => {
                        editContext.dispatch(actionCreator(editActions.setAbcText,state.tune));
                        history.push("/edit");
                    }}>
                    Edit
                </button>
            </li>
        </Fragment>
    );
};

const TuneSelectControls = ({ history }) => {
    const { state } = useContext(TuneSelectContext);

    return (
        <ul role="navigation">
            <li>
                <span role="button">
                    <Link to="/load">Load</Link>
                </span>
            </li>
            {state.titles.length > 0 && controls(history)}
        </ul>
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
