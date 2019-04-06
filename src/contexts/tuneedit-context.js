import React, { useReducer } from "react";
import { reducer } from "../helpers/reducer";
//import { getUrlList } from './services/url-list-storage'

const initialState = {
    abcText: "T:G Major Scale\nK:G\nGABcdefg",
    list: [],
    title: "",
    index: undefined,
    readonly: "false"
};

const setAbcText = (state, tune) => {
    return {
        ...state, 
        abcText: tune.abc,
        title: tune.title ? tune.title : "untitled"
    };
};
const setTitle = (state, title) => {
    return { ...state, title };
};
const makeEditRecord = (title, abcText) => {
    return { abcText, title };
};

export const dispatchThenRoute = (action, history, path) => {
    return dispatch => {
        dispatch(action);
        history.push(path);
    };
};

const saveEdit = (state, { title, abcText }) => {
    if (title.length === 0) {
        return state;
    }
    const tmp = state.list.filter(item => {
        return item.title !== title;
    });
    const list = [...tmp, makeEditRecord(title, abcText)];
    return { ...state, list, index: list.length - 1 };
};

const setIndex = (state, index) => {
    return {
        ...state,
        title: state.list[index].title,
        abcText: state.list[index].abcText,
        index
    };
};

export const actions = {
    setAbcText: "setAbcText",
    saveEdit: "saveEdit",
    setTitle: "setTitle",
    setIndex: "setIndex"
};

const reducerFunctions = {
    [actions.setAbcText]: setAbcText,
    [actions.saveEdit]: saveEdit,
    [actions.setTitle]: setTitle,
    [actions.setIndex]: setIndex
};

export const EditContext = React.createContext();

export const EditStore = ({ children }) => {
    const [state, dispatch] = useReducer(
        reducer(reducerFunctions),
        initialState
    );

    return (
        <EditContext.Provider value={{ state, dispatch }}>
            {children}
        </EditContext.Provider>
    );
};
