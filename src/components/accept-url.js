import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { TuneSelectContext, actions } from "../contexts/tuneselect-context.js";
import { actionCreator } from "../helpers/reducer";
import { useLayoutHelper } from "../helpers/layoutHelper";
import { GetTunebook } from "../services/get-tunebook";
import { TuneCollection } from "../abc-integration/tune-collection";
import { setUrlList, getUrlList } from "../services/url-list-storage";

const doSomething = (dispatch, url) => {
    console.log("about to fetch---->", url);
    GetTunebook(url).then(text => {
        console.log(text);
        dispatch(
            actionCreator(actions.addTunebookFromUrl, {
                url,
                tunebook: TuneCollection(text)
            })
        );
    });
};

export const AcceptUrl = () => {
    const { state, dispatch } = useContext(TuneSelectContext);
    const [inputValue, updateInput] = useState(state.url);
    const { fixedElement, scrollingElement } = useLayoutHelper();
   
    useEffect(() => {
        dispatch(
            actionCreator(actions.addTunebookUrlsFromList, getUrlList())
        );
    }, []);
   
    useEffect(() => {
        setUrlList(state.tunebooks.map(item => item.url));
    }, [state.tunebooks]);
    
    return (
        <Fragment>
            <div ref={fixedElement} className="controlbar">
                <ul role="navigation">
                    <li>Enter the URL address of an ABC tune or collection.</li>
                    <li>
                        <a
                            href="https://www.google.com/search?q=abc+tunebook"
                            target="_blank"
                            rel="noopener noreferrer">
                            Find tunebooks
                        </a>
                    </li>
                </ul>
                <ul role="navigation">
                    <li className="fill">
                        <input list="urls"
                            placeholder="http://tunebook-to-read"
                            value={inputValue}
                            onChange={e => updateInput(e.target.value)}
                        />
                        <datalist id="urls">
                            {state.urls.map((item, index) => <option key={index} value={item}/>)}
                        </datalist>
                    </li>
                    <li>
                        <button
                            onClick={() => doSomething(dispatch, inputValue)}>
                            Load URL
                        </button>
                    </li>
                    <li>
                        <Link to={"/view"}>
                            <button>Cancel</button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div ref={scrollingElement} className="container links">
                {state.tunebooks.map((item, index) => {
                    return (
                        <div className="icon_link" key={index}>
                            <span className="fa fa-trash" />
                            <Link to={`/collect/${index}`}>
                                {item.url} <br />
                                {item.tunebook.tuneCount()} tunes
                            </Link>
                        </div>
                    );
                })}
            </div>
        </Fragment>
    );
};
