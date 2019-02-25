import * as types from './ActionTypes';

export function increment() {
    return {
        type: types.INCREMENT
    };
}

export function showInfoIngredient(index) {
    return {
        type: types.SHOW_INFO_INGREDIENT,
        index
    };
}