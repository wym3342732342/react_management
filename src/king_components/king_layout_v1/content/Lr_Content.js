import React from "react";
import {Breadcrumb,Layout} from "antd";
import {connect} from 'react-redux';
const {Content} = Layout;

class LrContent extends React.Component{


    /**
     * 渲染面包屑
     * @param menuArray
     * @returns {*}
     */
    renderBreadcrumb = (menuArray) => {
        return menuArray.map(item=><Breadcrumb.Item>{item.title}</Breadcrumb.Item>)
    };

    render() {
        const {menuArray} = this.props;
        return (
            <Content className="king_content">
                <Breadcrumb className="bread_crumb" >
                    {
                        this.renderBreadcrumb(menuArray)
                    }
                </Breadcrumb>
                <Layout
                    className="king_subject">
                    {this.props.children}
                </Layout>
            </Content>
        );
    }
}

const BreadcrumbProps = state => {
    return {
        menuArray: state.menuArray
    }
};

export default connect(BreadcrumbProps)(LrContent);