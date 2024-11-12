// User-related reducer
const initialState = {
    id: -1,
    userInfo: null
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            return { ...state, id: action.payload.id, userInfo: action.payload.userInfo};
        case 'CLEAR_USER':
            return { ...state, user: null };
        default:
            return state;
    }
};

export default UserReducer;
