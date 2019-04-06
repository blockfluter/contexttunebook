import React, { useReducer } from "react";
import { reducer } from "../helpers/reducer";

//import { getUrlList } from './services/url-list-storage'

const initialState = {
    tunes: [],
    tuneIndex: undefined,
    tune: { url: "", abc: "", title: "" },
    titles: [],
    index: 0
};
const addCopy = (state, { abc, title, url }) => {
    const tunes = [
        ...state.tunes,
        { abc: abc.replace(/\nZ.*/, `$&\nZ:taken from ${url}`), title, url }
    ];

    return {
        ...state,
        tunes,
        tune: tunes[tunes.length - 1],
        tuneIndex: tunes.length - 1,
        titles: tunes.map(item => item.title)
    };
};
const selectTuneByIndex = (state, tuneIndex) => {
    tuneIndex = Number(tuneIndex);
    return {
        ...state,
        tuneIndex,
        tune: state.tunes[tuneIndex]
    };
};
const selectPrevTune = state => {
    const tuneIndex = Math.max(state.tuneIndex - 1, 0);
    return {
        ...state,
        tuneIndex,
        tune: state.tunes[tuneIndex]
    };
};
const selectNextTune = state => {
    const tuneIndex = Math.min(state.titles.length - 1, state.tuneIndex + 1);
    return {
        ...state,
        tuneIndex,
        tune: state.tunes[tuneIndex]
    };
};

export const actions = {
    addCopy: "addCopy",
    selectTuneByIndex: "selectTuneByIndex",
    selectPrevTune: "selectPrevTune",
    selectNextTune: "selectNextTune"
};

const reducerFunctions = {
    [actions.addCopy]: addCopy,
    [actions.selectTuneByIndex]: selectTuneByIndex,
    [actions.selectPrevTune]: selectPrevTune,
    [actions.selectNextTune]: selectNextTune
};

export const TuneCopyContext = React.createContext();
console.log("=========================>created context");
export const TunecopyStore = ({ children }) => {
    const [state, dispatch] = useReducer(
        reducer(reducerFunctions),
        initialState
    );
    return (
        <TuneCopyContext.Provider value={{ state, dispatch }}>
            {children}
        </TuneCopyContext.Provider>
    );
};
