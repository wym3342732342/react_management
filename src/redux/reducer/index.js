import {type} from "../action";
/**
 * Reducer：基本函数，用于对**State**的业务处理。
 * @param state
 * @param action
 */
const ebikeData = (state, action) => {
    switch (action.type) {
        case type.SWITCH_MEMU:
            return {
                ...state,
                menuName: action.menuName
            };
        case type.SWIRCH_MEMU_BREADCRUMB:
            return {
                ...state,
                menuArray: action.menuArray
            };
        default:
            return {...state}
    }
};

export default ebikeData;
