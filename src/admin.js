import React from "react";
// import {Col, Row} from "antd";
// import Header from './components/Header';//默认会加载文件中的index
// import Footer from './components/Footer';
// import NavLeft from './components/NavLeft';
import Page from './king_components/king_layout/page_LR'
import SimPage from "./components/sim_Page";

import {LayoutType} from './utils/EnumLayout'
import './style/common.less';

export default class Admin extends React.Component {//三段菜单架构

    selectPage = (type) => {
        switch (type) {
            case LayoutType.SIMPAGE:
                return <SimPage>{this.props.children}</SimPage>;
            case LayoutType.LRPAGE:
                return <Page>{this.props.children}</Page>;
        }
    };


    render() {
        const {type} = this.props;
        return (
            this.selectPage(type)
        );

    }
}