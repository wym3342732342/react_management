import React from "react";
import {Col, Row} from "antd";
import NavLeft from "./NavLeft";
import Footer from "./Footer";
import Header from "./Header";
export default class SimPage extends React.Component{
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
}