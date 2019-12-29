import React from "react";
import { Popover, Button } from 'antd';

/**
 * 滑动显示组件
 * - children：为滑动显示的内容
 * - card：{
 *      - title:卡片标题，可为不传没有标题
 *      - trigger:卡片弹出方式，默认为滑动显示。hover、focus、click
 * }
 * - summary：简介，底层显示文字
 * - placement:弹出位置
 * - arrowPointAtCenter:剪头是否指向中心，默认为true
 */
class SlideShow extends React.Component{

    render() {
        const {children,card,summary,placement,arrowPointAtCenter} = this.props;
        const title = card && card.title ? card.title : null;
        const trigger = card && card.trigger ? card.trigger : null;
        return (
            <div>
                <Popover
                    content={
                        children
                    }
                    placement={placement ? placement : "topLeft"}
                    arrowPointAtCenter={arrowPointAtCenter?true:false}
                    title={title}
                    trigger={trigger ? trigger : "hover"}
                >
                    {summary ? summary : null}
                </Popover>
            </div>
        );
    }
}
export default SlideShow;