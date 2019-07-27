import React, { useReducer } from "react";
import { reducer } from "../helpers/reducer";
import { TuneCollection } from "../abc-integration/tune-collection";

//import { getUrlList } from './services/url-list-storage'

const initialState = {
    tunebooks: [],
    tunebookIndex: undefined,
    tuneIndex: undefined,
    tune: {url:'',abc:'',title:''},
    titles: [],
    canCopy: true,
    url: '',
    urls:['one','two','three'],
};

const addTunebookFromUrl = (state, { url, tunebook }) => {
    const temp = [
        ...state.tunebooks.filter(item => {
            return item.url !== url;
        }),
        { url, tunebook }
    ];
  
    const result = {
        ...state,
        tunebookIndex: temp.length - 1,
        titles: temp[temp.length - 1].tunebook.titles(),
        tuneIndex: 0,
        tunebooks: temp,
        urls: temp.map(item=>item.url)
    };
    console.log('-->', result.tunebooks);
    return result;
};

const addTunebookUrlsFromList = (state, list) => {
    const result = {
        ...state,
        tunebooks:list.map(url => {
            return { url, tunebook: TuneCollection('') };
        }),
        urls: list,
    };
    return result;
};

const selectTunebookByIndex = (state, index) => {
    index = Number(index);
    if (index < 0 || index >= state.tunebooks.length) {
        return state;
    }
    const result = {
        ...state,
        titles: state.tunebooks[index].tunebook.titles(),
        tuneBookIndex: index,
        tuneIndex: 0,
        tune: {
            url: state.tunebooks[index].url,
            abc: state.tunebooks[index].tunebook.tuneAbc(0),
            title: state.tunebooks[index].tunebook.titles()[0],
        }
    };
    return result;
};
const selectTuneByIndex = (state, tuneIndex) => {
    tuneIndex = Number(tuneIndex);
    return {
        ...state,
        tuneIndex,
        tune: {
            url: state.tunebooks[state.tunebookIndex].url,
            abc: state.tunebooks[state.tunebookIndex].tunebook.tuneAbc(tuneIndex),
            title: state.tunebooks[state.tunebookIndex].tunebook.titles()[tuneIndex],
        }
    };
};
const selectPrevTune = state => {
    const tuneIndex = Math.max(state.tuneIndex - 1, 0);
    return {
        ...state,
        tuneIndex,
        tune: {
            url: state.tunebooks[state.tunebookIndex].url,
            abc: state.tunebooks[state.tunebookIndex].tunebook.tuneAbc(tuneIndex),
            title: state.tunebooks[state.tunebookIndex].tunebook.titles()[tuneIndex],
        }
    };
};
const selectNextTune = state => {
    const tuneIndex = Math.min(state.titles.length - 1, state.tuneIndex + 1);
    return {
        ...state,
        tuneIndex,
        tune: {
            url: state.tunebooks[state.tunebookIndex].url,
            abc: state.tunebooks[state.tunebookIndex].tunebook.tuneAbc(tuneIndex),
            title: state.tunebooks[state.tunebookIndex].tunebook.titles()[tuneIndex],
        }
    };
};
const addTunebookUrl = (state, newUrl) => {
    const temp = [
        ...state.urls.filter(url => {
            return url !== newUrl;
        })
    ];
    return {
        ...state,
        urls:[...temp, newUrl]
    };
};
const deleteTunebookUrl = (state, newUrl) => {
    const temp = [
        ...state.urls.filter(url => {
            return url !== newUrl;
        })
    ];
    const t = state.tunebooks.filter(tunebook => {
        return tunebook.url === newUrl;
    });
    return {
        ...state,
        tunebooks:[...t],
        urls:[...temp]
    };
};


export const actions = {
    addTunebookFromUrl: "addTunebookFromUrl",
    selectTunebookByIndex: "selectTunebookByIndex",
    selectTuneByIndex: "selectTuneByIndex",
    selectPrevTune: "selectPrevTune",
    selectNextTune: "selectNextTune",
    addTunebookUrlsFromList:"addTunebookUrlsFromList",
    addTunebookUrl:"addTunebookUrl",
    deleteTunebookUrl:"deleteTunebookUrl",
};

const reducerFunctions = {
    [actions.addTunebookFromUrl]: addTunebookFromUrl,
    [actions.selectTunebookByIndex]: selectTunebookByIndex,
    [actions.selectTuneByIndex]: selectTuneByIndex,
    [actions.selectPrevTune]: selectPrevTune,
    [actions.selectNextTune]: selectNextTune,
    [actions.addTunebookUrlsFromList]:addTunebookUrlsFromList,
    [actions.addTunebookUrl]:addTunebookUrl,
    [actions.deleteTunebookUrl]:deleteTunebookUrl,
  };

export const TuneSelectContext = React.createContext();
console.log("=========================>created context");
export const TunelistStore = ({ children }) => {
    const [state, dispatch] = useReducer(
        reducer(reducerFunctions),
        initialState
    );
    return (
        <TuneSelectContext.Provider value={{ state, dispatch }}>
            {children}
        </TuneSelectContext.Provider>
    );
};
