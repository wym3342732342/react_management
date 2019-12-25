import React from "react";
// import MenuConfig from "../../config/menuConfig";
import {Menu} from "antd";
import './index.less';
import {NavLink} from 'react-router-dom'
import {switchMenu} from "../../redux/action";
import {connect} from "react-redux";
import http from "../../http";
const SubMenu = Menu.SubMenu;

class NavLeft extends React.Component {

    state = {
        currentKey: '',
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
         });
     }
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

    handelClick = ({item,key,keyPath}) => {
        const {props:{children:{props:{children}}}} =  item;

        if (key == this.state.currentKey) {
            return false;
        }

        //事件派发，自动给调用reducer，通过reducer保存到store对象
        const {dispatch} = this.props;
        dispatch(switchMenu(children));//请求


        this.setState({
            currentKey: key
        });
    };



    //菜单渲染
    renderMenu = (data) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                );
            }else {
                return <Menu.Item key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            }
        });
    };

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <h1>管理系统</h1>
                </div>
                <Menu
                    theme='dark'
                    onClick={this.handelClick}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }
};

export default connect()(NavLeft);