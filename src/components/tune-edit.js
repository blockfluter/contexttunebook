import React, { useContext, useMemo, Fragment } from "react";
import { Link } from "react-router-dom";
import { AbcControls } from "./abc-controls";
import {
    EditContext,
    actions
} from "../contexts/tuneedit-context";
import { useLayoutHelper } from "../helpers/layoutHelper";
import { actionCreator } from "../helpers/reducer";
import { TopBar } from "./topbar";

export const TuneEdit = () => {
    const { state, dispatch } = useContext(EditContext);
    const { fixedElement, scrollingElement } = useLayoutHelper();

    return (
        <Fragment>
            <TopBar>
                <ul role='navigation'>
                    <li><Link to="/load">Load</Link></li>
                    <li className='fill'><input
                        placeholder="Saved tune name"
                        onChange={e => {
                            dispatch(
                                actionCreator(
                                    actions.setTitle,
                                    e.currentTarget.value
                                )
                            );
                        }}
                        value={state.title}
                    /></li>
                    <li><button
                        disabled={state.title.length === 0}
                        onClick={() => {
                            dispatch(
                                actionCreator(actions.saveEdit, {
                                    abcText: state.abcText,
                                    title: state.title
                                })
                            );
                        }}>
                        Save
                </button></li>
                    <li>
                        <label>Saved tunes</label>
                    </li><li>
                        <select
                            value={state.index}
                            onChange={e =>
                                dispatch(
                                    actionCreator(
                                        actions.setIndex,
                                        e.currentTarget.value
                                    )
                                )
                            }>
                            {state.list.map((t, i) => (
                                <option key={i} value={i}>
                                    {t.title}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
            </TopBar>
            <div ref={scrollingElement} className="container">
                {useMemo(
                    () => (
                        <AbcControls
                            {...state}
                            readOnly={false}
                            abcText={state.abcText}
                            publishAbcChange={abcText => {
                                console.log("publish->", abcText);
                                dispatch(
                                    actionCreator(actions.setAbcText, abcText)
                                );
                            }}
                        />
                    ),
                    [state.abcText]
                )}
            </div>
        </Fragment>

    );
};
