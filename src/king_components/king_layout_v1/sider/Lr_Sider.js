import React from "react";
import {Icon, Layout, Menu} from "antd";
// import menuConfig from "../../../config/menuConfig";
import {NavLink, withRouter} from "react-router-dom";
import {switchMenuBreadcrumb} from "../../../redux/action";
import {connect} from 'react-redux';
import http from "../../../http";


const baseUrl = "";
const { Sider } = Layout;
const { SubMenu } = Menu;

/**
 * 左侧导航栏，面包屑的控制都在这里边
 */
class LrSider extends React.Component {

    state = {
        currentKey: '',
        menuTreeNode: null,
        menuMap: new Map()
    };

    componentWillMount() {
        http.get("/common/menu/query").then((data) => {
            const menuTreeNode = this.renderMenu(data);
            this.setState({
                menuTreeNode
            });
            //设置对应关系
            let menuArray = this.createMenuArray(data);
            //将数组转换为Map,并存入state
            this.arrayToMap(menuArray);

            //创建好对应数组，获取导航栏路由，配置当前面包屑
            let pathname = window.location.pathname;
            let keyPath = this.cutAndGroup(pathname);
            //设置面包屑地址
            let breadcrumb = this.createBreadcrumb(keyPath);

            this.breadcrumbsChange(breadcrumb);
        });
    }

    //切割uri并拼成数组
    cutAndGroup = (pathname) => {
        const {menuMap} = this.state;
        //切割
        let uriPiece = pathname.split("/").filter(item => item !== "" && item !== baseUrl);
        let currentUri = "";

        //成组
        let keyPath = [];
        for (let i = 0; i < uriPiece.length; i++) {
            currentUri += "/" + uriPiece[i];
            if (menuMap.has(currentUri)) {
                keyPath.push(currentUri);
            }
        }
        return keyPath;
    };

    //导航菜单缩小事件
    onCollapse = (collapsed) => {
        const {onCollapse} = this.props;
        onCollapse && onCollapse(collapsed);
    };

    //设置进map
    arrayToMap = (menuArray) => {
        const {menuMap} = this.state;
        let map = new Map(menuMap);
        menuArray.forEach(item => {
            map.set(item.key, item.title);
        });
        this.setState({
            menuMap: map
        });
    };

    //创建对应数组
    createMenuArray = (menus) => {
        if (Array.isArray(menus)) {
            let array = [];
            for (let i = 0; i < menus.length; i++) {
                const menuObj = {
                    key: menus[i].key,
                    title: menus[i].title
                };
                array.push(menuObj);
                if (menus[i].children) {
                    let menuArray = this.createMenuArray(menus[i].children);
                    if (menuArray) {
                        for (let j = 0; j < menuArray.length; j++) {
                            array.push(menuArray[j]);
                        }
                    }
                }
            }
            return array;
        }
    };
    //菜单点击事件
    handelClick = ({keyPath}) => {
        keyPath.reverse();//倒叙
        let breadcrumb = this.createBreadcrumb(keyPath);
        this.breadcrumbsChange(breadcrumb);
    };
    //时间派发，改变面包屑
    breadcrumbsChange(breadcrumb) {
        const {dispatch} = this.props;
        dispatch(switchMenuBreadcrumb(breadcrumb));//事件派发
    }

    //根据菜单层级创建menuArray
    createBreadcrumb = (keyPath) => {
        const {menuMap} = this.state;
        let breadcrumb = [];
        keyPath.forEach(item => {
            breadcrumb.push({
                key: item,
                title: menuMap.get(item)
            })
        });
        return breadcrumb;
    };

    //菜单渲染
    renderMenu = (data) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={
                        <span>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </span>
                    } key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            } else {
                return <Menu.Item key={item.key}>
                    <Icon type={item.icon}/>
                    {/*<span>{item.title}</span>*/}
                    <span>{item.title}</span>
                    <NavLink to={item.key}/>{/*路由解决方案一*/}

                </Menu.Item>
            }
        });
    };


    render() {
        const {collapsed} = this.props;
        let logoStyle = {
            textAlign: collapsed ? "center" : "left"
        };


        return (
            <Sider
                trigger={null}
                className="king_sider"
                collapsible
                collapsed={collapsed}
                onCollapse={this.onCollapse}
            >

                <div className="logo" style={{...logoStyle}}>
                    <img src="/assets/logo-ant.svg" alt=""/>
                    {!collapsed && <span>后台通用管理系统</span>}
                </div>

                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={this.handelClick}
                >

                    {this.state.menuTreeNode}
                </Menu>

            </Sider>
        );
    }

}

export default connect()(withRouter(LrSider));