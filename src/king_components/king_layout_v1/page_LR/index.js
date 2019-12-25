import React from "react";
import {Layout} from "antd";
import './page.less'
import LrSider from "../sider/Lr_Sider";
import LrHeader from "../header/Lr_header";
import LrFooter from "../footer/Lr_Footer";
import LrContent from "../content/Lr_Content";


class Page extends React.Component{

    state = {
        collapsed: false,
    };
    //导航缩小
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    //头部点击导航缩小
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };


    render() {
        const {collapsed} = this.state;
        return (
            <Layout className="king_page">

                <LrSider
                    collapsed={collapsed}//导航展开标示
                    onCollapse={this.onCollapse}//导航下方点击事件
                />

                <Layout className="king_right_page">
                    <LrHeader //头部
                        collapsed={collapsed}
                        toggle={this.toggle}
                    />

                    <LrContent>
                        {this.props.children}
                    </LrContent>{/*主内容*/}

                    <LrFooter />{/*尾部*/}
                </Layout>
            </Layout>
        );
    }
}
export default Page;