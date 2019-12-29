import React from "react";
import SlideShow from "../SlideShow";

/**
 * 换过显示所有组件
 */
class SlideOverDisPlayAll extends React.Component{
    render() {
        const {children,displayLength} = this.props;
        const len = displayLength ? parseInt(displayLength): 8;
        return (
            <div>
                {
                    children.length > len
                        ?
                        <SlideShow
                            arrowPointAtCenter
                            summary={children.substr(0, len) + "..."}//默认显示8位
                        >
                            {children}
                        </SlideShow>
                        :
                        children
                }
            </div>
        );
    }
}

export default SlideOverDisPlayAll;