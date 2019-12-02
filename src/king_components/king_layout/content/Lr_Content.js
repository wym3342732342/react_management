import React from "react";
import {Breadcrumb,Layout} from "antd";
import {connect} from 'react-redux';
const {Content} = Layout;

class LrContent extends React.Component{

    renderBreadcrumb = (menuArray) => {
        return menuArray.map(item=><Breadcrumb.Item>{item.title}</Breadcrumb.Item>)
    };

    render() {
        const {menuArray} = this.props;
        return (
            <Content className="king_content">
                <Breadcrumb style={{margin: '16px 0'}}>
                    {
                        this.renderBreadcrumb(menuArray)
                    }
                </Breadcrumb>
                <div
                    className="king_subject">
                    {this.props.children}
                </div>
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