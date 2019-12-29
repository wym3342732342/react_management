import React from "react";
import {Tree, Input, Icon, Spin} from 'antd';
import http from "../../../http";

const { TreeNode } = Tree;
const { Search } = Input;

/**
 * 基本树形选择组件【同步，搜索】
 * - showIcon：展示图标
 * - showSearch：展示搜索框
 * - indexKey：返回数据中作为key的字段
 * - title：返回数据中的内容字段
 */
class BaseSearchTree extends React.Component {
    state = {
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
        loading:false,//树形加载
        treeData:[],//整棵树数据
    };

    treeNodeList = [];//树节点列表

    componentDidMount() {
        const {onRef} = this.props;
        this.loadingTreeData();
        onRef && onRef(this);
    }

    /**
     * 加载数据
     */
    loadingTreeData = () => {
        const {url} = this.props;
        this.treeNodeList = [];//滞空

        this.setState({loading: true});
        //加载数据
        http.get(url).then(data => {
            this.generateList(data);//生成树形列表
            this.setState({
                treeData: data,
                loading: false
            })
        }).catch(() => {
            this.setState({loading: false});
        });
    };

    /**
     * 生成树形列表【废弃】
     * @param data
     */
    generateList = data => {
        const props = this.props;
        const indexKey = props.indexKey ? props.indexKey : "key";
        const titleKey = props.title ? props.title : "title";
        const upId = props.upId ? props.upId : "upId";
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const key = node[indexKey];
            const title = node[titleKey];
            const parentKey = node[upId];

            this.treeNodeList.push({key,title,parentKey});

            if (node.children) {
                this.generateList(node.children);
            }
        }
    };

    //节点展开事件
    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    };
    /**
     * 查找当前节点的父节点
     * @param key 符合搜索条件的key
     * @param tree 整棵树的数据
     * @returns {*}
     */
    getParentKey = (key, tree) => {
        let parentKey;
        for (let i = 0; i < tree.length; i++) {

            const node = tree[i];

            if (node.children) {
                if (node.children.some(item => item.key === key)) {//some不会改变原数组的遍历方式
                    parentKey = node.key;
                } else if (this.getParentKey(key, node.children)) {
                    parentKey = this.getParentKey(key, node.children);//他没有遍历它孩子的孩子
                }
            }
        }
        return parentKey;
    };

    /**
     * 搜索框值改变事件
     * @param e
     */
    onChange = e => {
        const { value } = e.target;

        let expandedKeys = this.state.expandedKeys ? this.state.expandedKeys : [];
        debugger;
        if (value !== "") {
            //过滤选择的节点
            expandedKeys = this.treeNodeList
                .map(item => {
                    if (item.title.indexOf(value) > -1) {
                        return item.parentKey;
                    }

                    return null;
                })
                .filter((item, i, self) => item && self.indexOf(item) === i);
        }
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    };

    /**
     * 递归渲染子节点
     * @param data 所有节点数据
     * @returns {*}
     */
    loop = data => {
        const props = this.props;
        const indexKey = props.indexKey ? props.indexKey : "key";
        const titleKey = props.title ? props.title : "title";


        const {searchValue} = this.state;
        return data.map(item => {
            const index = item[titleKey].indexOf(searchValue);//在title中找出所在的位置

            const beforeStr = item[titleKey].substr(0, index);//开始位置

            const afterStr = item[titleKey].substr(index + searchValue.length);//结束位置

            const title = //如果有对应的颜色，就将那几个字变色
                index > -1 ? (
                    <span>
                            {beforeStr}
                        <span style={{color: '#f50'}}>{searchValue}</span>
                        {afterStr}
                        </span>
                ) : (
                    <span>{item.title}</span>
                );

            if (item.children) {
                return (//有字节点的情况
                    <TreeNode
                        icon={
                            <Icon type={item.icon} />
                        }
                        key={item[indexKey]}
                        title={title}>
                        {this.loop(item.children)}
                    </TreeNode>
                );
            }
            //没有子节点的情况
            return <TreeNode
                icon={
                    <Icon type={item.icon} />
                }
                key={item[indexKey]}
                title={title}
            />;
        });
    };

    /**
     * 树形点击时间
     * - 单选时，传单个id给上层
     * - 多选时，传给上层数组
     */
    onSelect = (selectedKeys,e) => {
        const {onSelect,isManySelect} = this.props;
        if (selectedKeys && Array.isArray(selectedKeys)) {
            onSelect && onSelect(isManySelect ? selectedKeys : selectedKeys[0]);
        }
    };

    render() {
        //searchValue:搜索值，expandedKeys：扩展key,autoExpandParent:自动展开父级
        const {expandedKeys, autoExpandParent,treeData,loading } = this.state;
        const {showIcon,showSearch} = this.props;
        return (
            <div>
                <Spin tip="加载中..." spinning={loading}>
                    {
                        showSearch
                        &&
                        <Search style={{marginBottom: 8}} placeholder="输入搜索！" onChange={this.onChange}/>
                    }
                    <Tree
                        showIcon={showIcon}
                        onExpand={this.onExpand}//节点展开时
                        expandedKeys={expandedKeys}//展开指定的父节点
                        autoExpandParent={autoExpandParent}//是否自动展开父节点
                        onSelect={this.onSelect}
                    >
                        {this.loop(treeData)}
                    </Tree>
                </Spin>
            </div>
        );
    }
}

export default BaseSearchTree;