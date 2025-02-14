const initialState = {
    isUser: false,
};

const adminReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'TOGGLE_ADMIN':
            return {
                ...state,
                isUser: !state.isUser,
            };
        default:
            return state;
    }
};

export default adminReducer;