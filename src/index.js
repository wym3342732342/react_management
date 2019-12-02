import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from './router';

import {Provider} from 'react-redux';
import configureStore from './redux/store/configureStore'

import {LayoutType} from './utils/EnumLayout'

const store = configureStore();//创建状态，用哪个创建那个

ReactDOM.render(
    <Provider store={store}>
        <Router
            pageType={LayoutType.LRPAGE}
        />
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();//取消注册服务人员
// serviceWorker.register();//注册服务人员
