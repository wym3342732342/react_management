import React from "react";
import {Layout, Col, Icon, Row, Spin} from "antd";
import Notification from "./component/notification";
import UserInfo from "./component/userInfo";
import http from "../../../http";

const {Header} = Layout;

export default class LrHeader extends React.Component{

    state = {
        userInfo: null,
        loading:false
    };

    toggle = () => {
        const {toggle} = this.props;
        toggle && toggle();
    };

    componentDidMount() {
        this.setState({loading: true})

        http.get("/common/user/queryInfo").then(data => {
            // debugger;
            const info = {
                username: data.realName,
                src: data.imgUrl ? data.imgUrl : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            };
            this.setState({
                userInfo: {...info},
                loading: false
            })
        });
    }

    render() {
        const {userInfo,loading} = this.state;
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
                            {!loading?
                                <UserInfo
                                style={{textAlign:"right"}}
                                userInfo={userInfo}
                                />
                                :
                                <Spin>
                                    <UserInfo
                                    style={{textAlign:"right"}}
                                    userInfo={userInfo}
                                    />
                                </Spin>
                            }
                        </Col>
                    </Row>
                </div>
            </Header>
        )
    }
}