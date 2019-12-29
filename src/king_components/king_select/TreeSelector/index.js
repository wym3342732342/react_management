import React from "react";
import {TreeSelect} from 'antd';
import http from "../../../http";

/**
 * 树选择
 * - placeholder：选择提示语句
 * - treeDefaultExpandAll:是否默认全展开
 * - onChange:传入后和传入value配置是组件变得受控
 * - value:选中的值
 * - url:请求树形的id
 * - isProcess：是否需要处理
 * - indexKey:将此字段转换为key
 * - multiple：是否可多选
 * - maxTagCount：最多显示多少tag【多选时】
 * - treeCheckStrictly:父子节点是否关联
 * - treeDefaultExpandedKeys：默认展开的节点
 */
class BaseSelectTree extends React.Component {
    state = {
        values: null,
        loading: false
    };

    treeData = [];

    /**
     * 加载完成后
     */
    componentDidMount() {
        const {onRef} = this.props;
        //加载树
        this.loading();
        onRef && onRef(this);//传给父组件
    }

    /**
     * 加载数据
     */
    loading = () => {
        const {url} = this.props;
        this.treeData = [];

        this.setState({loading: true});
        //加载数据
        http.get(url).then(data => {
            this.treeData = this.generateTreeData(data);
            this.setState({
                loading: false
            })
        }).catch(() => {
            this.setState({loading: false});
        });
    };

    /**
     * 处理key
     * @param data
     */
    generateTreeData = (data) => {
        const {isProcess,indexKey} = this.props;
        if (isProcess) {
            return this.handleTreeData(data, indexKey);
        }
        return [];
    };

    /**
     * 真正的处理方法
     * @param data 数据
     * @param indexKey 待处理字段
     */
    handleTreeData = (data,indexKey) => {
        if (data && Array.isArray(data)) {
            return data.map(item => {
                let node = {};
                node.title = item.title;
                node.value = item[indexKey];
                node.key = item[indexKey];
                if (item.children) {
                    node.children = this.handleTreeData(item.children, indexKey);
                }
                return node;
            });
        }
    };

    /**
     * 返回选中的key
     * @returns {null}
     */
    getSelectedKeys = () => {
        return this.state.value;
    };

    /**
     * 传入上层
     * @param value
     */
    onChange = value => {
        const {onChange} = this.props;
        this.setState({ values:value });
        onChange && onChange(value);
    };
    /**
     * 树选择事件
     * @param value
     */
    onSelect = value => {

    };

    render() {
        const props = this.props;
        const {placeholder,treeDefaultExpandAll,multiple,maxTagCount,defaultValue,onChange,treeDefaultExpandedKeys,treeCheckStrictly} = props;

        const {values} = this.state;

        const value = props.value || (onChange ? [] : values);//父组件传入的值

        const attributes = {};//动态控制的属性
        if (value) {
            attributes.value = value;
        }
        if (props.defaultValue) {//默认值
            attributes.defaultValue = defaultValue;
        }



        return (
            <TreeSelect
                {...attributes}
                allowClear//清除按钮
                multiple={multiple}
                maxTagCount={maxTagCount ? maxTagCount : 2}
                style={{width: '100%'}}
                treeCheckable={multiple}//勾选如果是多选就是勾选
                dropdownStyle={{maxHeight: 150, overflow: 'auto'}}
                treeData={this.treeData}
                placeholder={placeholder ? placeholder : "请选择"}
                treeDefaultExpandAll={treeDefaultExpandAll}
                treeDefaultExpandedKeys={treeDefaultExpandedKeys}
                treeCheckStrictly={treeCheckStrictly}//切断父子节点关系
                labelInValue={false}//不能是value：lable
                showCheckedStrategy={TreeSelect.SHOW_ALL}//选择方式，是否选择父节点等等
                onChange={this.onChange}
                onSelect={this.onSelect}
            />
        );
    }
}

export default BaseSelectTree;