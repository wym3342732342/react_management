import React from "react";
import {Avatar, Badge, message, Popover} from "antd";

/**
 * 用户信息基础组件v0.1
 * - trigger：hover移入、focus聚集、click点击.
 * - placement：防止位置从，什么地方移入.
 * - title：弹出开篇的名称.
 * - children：弹出后显示的主题内容
 * - backgroundColor:放置的图标背景色
 * - shape：形状
 * - icon：图标
 * - rightTopMsg：Badge中的属性
 * - popoverInfo:包含了，trigger、placement、title
 * - avatarInfo：包含了，backgroundColor、shape、icon
 */
class BaseUserInfo extends React.Component{


    componentWillMount() {
        const {
            popoverInfo,
            trigger,
            placement,
            title,
            children,
            avatarInfo,
            backgroundColor,
            shape,
            icon,
            rightTopMsg
        } = this.props;

        let info = {};

        //判断上层传入的信息，存入自己的状态当中给下方使用
        if (popoverInfo) {
            info.trigger = popoverInfo.trigger;
            info.placement = popoverInfo.placement;
            info.title = popoverInfo.title;
        }else {
            info.trigger = trigger;
            info.placement = placement;
            info.title = title;
        }
        if(avatarInfo){
            info.backgroundColor = avatarInfo.backgroundColor;
            info.shape = avatarInfo.shape;
            info.icon = avatarInfo.icon;
        }else {
            info.backgroundColor = backgroundColor;
            info.shape = shape;
            info.icon = icon;
        }
        if (children){
            info.children = children;
        }
        if (rightTopMsg) {
            info.rightTopMsg = rightTopMsg;
        }else{
            info.rightTopMsg = {
                dot: true
            }
        }
        this.state = {
            info
        };
    }

    render() {
        const {trigger,placement,title,backgroundColor,shape,icon,children,rightTopMsg} = this.state.info;
        return (
            <div>
                <a>
                    <Popover
                        trigger={trigger ? trigger : "hover"}
                        placement={placement ? placement : "bottomRight"}
                        title={title ? title : "用户信息"}
                        content={children ? children :
                            <div style={{textAlign: "center", background: "#9cb3c5"}}>暂无用户信息</div>}>
                        <Badge {...rightTopMsg}>

                            <Avatar
                                style={{backgroundColor: backgroundColor ? backgroundColor : '#5580ff'}}
                                shape={shape ? shape : "square"}
                                icon={icon ? icon : "user"}
                            />

                        </Badge>
                    </Popover>
                </a>
            </div>
        );
    }
}

export default BaseUserInfo;