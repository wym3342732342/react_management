import React from "react";
import {Layout, Col, Icon, Row} from "antd";
import Notification from "./component/notification";
import UserInfo from "./component/userInfo";

const {Header} = Layout;

export default class LrHeader extends React.Component{

    toggle = () => {
        const {toggle} = this.props;
        toggle && toggle();
    };

    render() {
        const {collapsed} = this.props;
        return(
            <Header className="king_header">
                <div>
                    <Row className='header-top' gutter={15}>
                        <Col span={4}>
                            <Icon
                                className="trigger"
                                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                        </Col>
                        <Col span={1} offset={18}>
                            <Notification
                                style={{textAlign:"right"}}
                            />
                        </Col>
                        <Col span={1}>
                            <UserInfo
                                style={{textAlign:"right"}}
                            />
                        </Col>
                    </Row>
                </div>
            </Header>
        )
    }
}