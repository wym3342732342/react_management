import React from "react";
import {Popconfirm} from "antd";

/**
 * 弹出确认框
 * onOk：传入确认的回调
 * onCancel：传入取消的回调
 * okText:确认文字，默认确定
 * cancelText：取消文字。默认取消
 * placement:箭头防线
 * arrowPointAtCenter：箭头是否指向中心，默认是
 */
class PopConfirmation extends React.Component{
    /**
     * 确认
     */
    onConfirm = () => {
        const {onOk} = this.props;
        onOk && onOk();
    };

    /**
     * 取消
     */
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    };

    render() {
        const {title,okText,cancelText,children,placement,arrowPointAtCenter} = this.props;
        return (
            <Popconfirm
                title={title ? title : "您确认吗"}
                onConfirm={this.onConfirm}//确认
                onCancel={this.onCancel}//取消
                okText={okText ? okText : "确定"}
                cancelText={cancelText ? cancelText : "取消"}
                placement={placement ? placement : "topLeft"}//箭头位置
                arrowPointAtCenter={arrowPointAtCenter ? true : false}//箭头指向内容中心
            >
                {children}
            </Popconfirm>
        );
    }
}

export default PopConfirmation;