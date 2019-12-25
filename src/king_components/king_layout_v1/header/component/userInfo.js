import React from "react";
import {Avatar, Button} from "antd";
import BaseUserInfo from "../../../king_baseUserInfo";


/**
 * 用户信息组件v0.1
 */
class UserInfo extends React.Component{

    render() {
        const {userInfo} = this.props;
        let userImg = {};
        if (userInfo&&userInfo.src) {
            userImg = {
                src:userInfo.src
            };
        }else{
            userImg = {
                icon: 'user'
            };
        }

        return (
            <BaseUserInfo>
                <div style={{textAlign: "center"}}>
                    <Avatar size={64} {...userImg} />
                    <div style={{marginTop: 5}}>{userInfo&&userInfo.username?userInfo.username:"裤裆有棵草"}</div>
                </div>
                <div style={{marginTop:15}}>
                    <Button size="small" style={{margin:"0 3px"}}>个人信息</Button>
                    <Button size="small" style={{margin:"0 3px"}}>退出登陆</Button>
                </div>
            </BaseUserInfo>
        );
    }
}

export default UserInfo;