import React, { useEffect, useState, useContext, Fragment, createRef } from "react";
import { Link } from "react-router-dom";
import { TuneSelectContext, actions } from "../contexts/tuneselect-context.js";
import { actionCreator } from "../helpers/reducer";
import { useLayoutHelper } from "../helpers/layoutHelper";
import { GetTunebook } from "../services/get-tunebook";
import { TuneCollection } from "../abc-integration/tune-collection";
import { setUrlList, getUrlList } from "../services/url-list-storage";

import { withStyles } from "@material-ui/core/styles";
import { TopBar } from './topbar';
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Card from "@material-ui/core/Card";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Select from 'react-select';

import MenuIcon from "@material-ui/icons/Menu";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const fetchTunebook = (state, dispatch, url, index, history) => {
    console.log("about to fetch---->", url);
    GetTunebook(url)
        .then(text => {
            console.log(text);
            dispatch(
                actionCreator(actions.addTunebookFromUrl, {
                    url,
                    tunebook: TuneCollection(text)
                })
            );
        })
        .then(() => {
            history.push(`/collect/${index}`);
        });
};

const addTunebookUrl = (state, dispatch, url) => {
    dispatch(
        actionCreator(actions.addTunebookUrl, url)
    );
}
const deleteTunebookUrl = (dispatch, url) => {
    dispatch(actionCreator(actions.deleteTunebookUrl, url));
}

const styles = {
    // these buttons will be aligned to right side of abbBar
    toolbarButtons: {
        marginLeft: "auto",
        marginRight: -12
    },
    menuButton: {
        marginRight: 20,
        verticalAlign: 'middle'
    },
    card: {
        margin: 30,
        padding: 12,
        width: 'max-content'
    },
    inputGroup: {
        width: '500px'
    }
};

export const AcceptUrl = withStyles(styles)((props) => {
    const { state, dispatch } = useContext(TuneSelectContext);
    const [inputValue, updateInput] = useState(state.url);

    useEffect(() => {
        dispatch(actionCreator(actions.addTunebookUrlsFromList, getUrlList()));
    }, []);
    useEffect(() => {
        setUrlList(state.urls);
    }, [state.tunebooks]);
    return (
        <Fragment>
            <TopBar>
                Import Tunes
            </TopBar>
            <Card className={props.classes.card}>
                <FormControl className={props.classes.menuButton}>
                    <Button
                        disabled={!inputValue.match(/^https?:\/\//)}
                        color="primary"
                        variant="contained"
                        onClick={() => addTunebookUrl(state, dispatch, inputValue)}>
                        Import
                    </Button>
                </FormControl>
                <FormControl className={props.classes.inputGroup}>
                    <InputLabel htmlFor="urls">Url to import</InputLabel>
                    <Input list="urls"
                        placeholder="Url to import"
                        value={inputValue}
                        onChange={e => updateInput(e.target.value)}
                    />
                    <FormHelperText id="my-helper-text">
                        Import an ABC tune or collection from a URL address
                    </FormHelperText>
                </FormControl>
                <List>
                    {state.urls.map((url, index) => {
                        return (
                            <ListItem key={index}>
                                <Link to="#" component="a" onClick={() => {
                                    fetchTunebook(state, dispatch, url, index, props.history)
                                }}>
                                    {url}
                                </Link>
                                <ListItemSecondaryAction>
                                    <DeleteIcon data-index={url} onClick={(a, b, c) => { deleteTunebookUrl(dispatch, a.currentTarget.dataset.index) }} />
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </Card>

        </Fragment>
    );
});
/*
export const junk = () => {
    const { state, dispatch } = useContext(TuneSelectContext);
    const [inputValue, updateInput] = useState(state.url);
    const { fixedElement, scrollingElement } = useLayoutHelper();

    useEffect(() => {
        dispatch(actionCreator(actions.addTunebookUrlsFromList, getUrlList()));
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
                        <input
                            list="urls"
                            placeholder="http://tunebook-to-read"
                            value={inputValue}
                            onChange={e => updateInput(e.target.value)}
                        />
                        <datalist id="urls">
                            {state.urls.map((item, index) => (
                                <option key={index} value={item} />
                            ))}
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
 */