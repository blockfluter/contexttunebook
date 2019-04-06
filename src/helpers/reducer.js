
export const reducer = reducers => {
    return (state, action) => {
        console.log(state, action);
        if (reducers[action.type]) {
            const result = reducers[action.type](state, action.payload);
            console.log("R:", result);
            return result;
        }
        throw Error(`no reducer found for ${action.type}`);
    };
};

export const actionCreator = (type, payload) => {
    return { type, payload };
};
