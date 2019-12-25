import React from "react";
import {Avatar, Badge, Popover} from "antd";

/**
 * 消息通知v0.1
 */
class Notification extends React.Component{
    render() {
        return (
            <div>
                <a>
                    <Popover
                        trigger="hover"
                        placement="bottomRight"
                        title={"消息通知"} content={<div style={{textAlign:"center"}}>当前暂无消息</div>}
                    >
                        <Badge dot>
                            <Avatar style={{ backgroundColor: '#5580ff' }} shape="square" icon="bell" />
                        </Badge>
                    </Popover>
                </a>
            </div>
        );
    }
}

export default Notification;