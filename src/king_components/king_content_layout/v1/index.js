import React from "react";
import {Layout} from "antd";
import './index.less'
const {Content, Sider} = Layout;

/**
 * 左右布局式组件
 */
class ContentLayout extends React.Component{
    render() {
        const {siderContent, content, children} = this.props;
        const detail = content ? content : children;//优先使用标签传入的内容
        return (
            <div className="king_content_layout_v1">
                <Layout>
                    <Sider
                        className="king-layout-sider"
                        width="calc(45vh - 1px)"
                        collapsible
                        collapsedWidth="0"
                    >
                        <div className="king-layout-sider-content">
                            {siderContent}{/* 左侧内容 */}
                        </div>
                    </Sider>

                    <Content
                        className="king-layout-content"
                    >
                        {detail}
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default ContentLayout;