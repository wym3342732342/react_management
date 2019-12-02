import {createStore} from 'redux'
import reducer from './../reducer';

const initialState = {
    menuName: '首页',
    menuArray:[
        {
            key: "/home",
            title: "首页"
        }
    ]
};
const configureStore = () => createStore(reducer, initialState);//创建初始state

export default configureStore;