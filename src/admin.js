import React from "react";
import {Col, Row} from "antd";
import Header from './components/Header';//默认会加载文件中的index
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
import './style/common.less';

export default class Admin extends React.Component {//三段菜单架构

    render() {
        return (
            <Row className='container'>
                <Col span={3} className="nav-left">
                    <NavLeft/>
                </Col>
                <Col span={21} className="main">
                    <Header/>
                    <Row className="content">
                        {/*<Home />*/}
                        {this.props.children}
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        );
    }
};