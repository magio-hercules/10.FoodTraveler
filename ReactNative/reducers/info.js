import * as types from '../actions/ActionTypes';

const initialState = {
    // color: [255, 255, 255]
    index: -1
};

export default function info(state = initialState, action) {
    if(action.type == types.SHOW_INFO_INGREDIENT) {
        return {
            ...state,
            index: action.index
        };
    } else {
        return state;
    }
}