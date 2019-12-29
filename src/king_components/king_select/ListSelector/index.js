import React from "react";
import {Select} from 'antd';
import http from "../../../http";

const { Option } = Select;


/**
 * 列表式多选器
 *
 * - onChange: 传入所有选入id
 * - getSelectedIds: 非受控时传出选中id
 * - value：选中key的列表，受控时可用
 * - valKey：显示的内容，数组中要展示的key
 * - defaultValue：默认选中对象,直接传入id即可渲染
 * - placeholder：提示文字
 * - size：选择器大小
 * - url：请求数据
 */
class ListSelector extends React.Component {
    state = {
        children: [],
    };

    selectIds = [];//选择了的ids

    /**
     * 组件渲染之后【加载一次】
     */
    componentDidMount() {
        const props = this.props;
        http.get(props.url).then(data => {
            this.setState({
                children: data,
            });
        });
        props.onRef && props.onRef(this);//传入父组件
    }
    /**
     * 返回ids
     * @returns {[]}
     */
    getSelectedIds = () => {
        return this.selectIds;//返回ids
    };

    /**
     * 创建孩子
     * @param list
     * @returns {[]}
     */
    buildChildren = (list) => {
        const children = [];
        const {valKey} = this.props;
        const key = valKey ? valKey : "label";

        list.forEach(item => {
            children.push(<Option key={item.id}>{item[key]}</Option>);
        });
        return children
    };
    /**
     * 值改变事件,传给form
     * @param value
     */
    handleChange = (value) => {
        const {onChange} = this.props;
        this.selectIds = value;
        onChange && onChange(value);
    };

    render() {
        const {children} = this.state;
        const props = this.props;
        const {placeholder, size} = props;

        const values = props.value || props.defaultValue || [];//父组件传入的值

        const attributes = {};//动态控制的属性
        if (values) {
            attributes.value = values;
        }
        if (props.defaultValue) {//默认值
            attributes.defaultValue = props.defaultValue;
        }
        return (
            <div>
                <Select
                    allowClear
                    maxTagTextLength="10"//tag最大文本
                    maxTagCount="1"
                    mode="multiple"
                    size={size ? size : "default"}
                    placeholder={placeholder ? placeholder : "请选择！"}
                    {...attributes}
                    onChange={this.handleChange}
                    style={{width: '100%'}}
                >
                    {this.buildChildren(children)}
                </Select>
            </div>
        );
    }
}

export default ListSelector;
