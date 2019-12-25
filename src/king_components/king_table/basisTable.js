import React from "react";
import {message, Spin, Table} from "antd";
import Utils from "../../utils/utils";
import http from "../../http";

/**
 * 基础表格组件
 *
 * 相关说明：
 * 1、默认分页：默认第一页，每页显示5条
 *
 * 相关参数：
 * 1、 选择框 ：radio【单选】，checkbox【多选】
 * 2、数据列：columns
 * 3、表格请求地址：url
 * 4、提供onRef将自己给父类型的回调
 * 5、initParams：初始查询参数
 *
 * 提供的方法：
 * 1、getSelectedIds()：返回选中的id数组
 * 2、getSelectedId()：返回id值，用在单选
 * 3、getSelectedRows()：返回当前选中所有行
 * 4、getSelectedRow()：返回当前选中行，用于单选
 */
export default class BasisTable extends React.Component {

    state = {
        loading: false,
        dataSource: [],
        selectedRowKeys:[],//选中的行建，用于展示
        selectedRows:[]//选中行的id,用于操作
    };

    params = {//分页数据
        current: 1, //当前页
        size: 5//每页显示
    };
    //用于存储搜索条件
    searchParam = {};

    componentDidMount() {
        const {initParams,onRef,isAuto=true} = this.props;
        onRef && onRef(this);//将自己传给父组件
        if (isAuto) {
            this.searchData(initParams);
        }
    }

    /**
     * 返回所有选中行数据
     * @returns {null|[]}
     */
    getSelectedRows = () => {
        const {selectedRows} = this.state;
        if (selectedRows && selectedRows.length > 0) {
            return selectedRows;
        }
        message.info("请在操作前选择数据！");
        return null;
    };
    /**
     * 用于单选：返回选中行的数据
     * @returns {null|*}
     */
    getSelectedRow = () => {
        let selectedRows = this.getSelectedRows();
        if (selectedRows) {
            return selectedRows[0];
        }
        return null;
    };

    /**
     * 多选时,返回选中的ids
     * @returns {null|[]}
     */
    getSelectedIds = () => {
        let selectedRows = this.getSelectedRows();
        if (selectedRows) {
            return selectedRows.map(item => item.id);
        }
        return null;
    };
    /**
     * 单选时返回一条id
     * @returns {null|*}
     */
    getSelectedId = () => {
        let selectedRow = this.getSelectedRow();
        if (selectedRow) {
            return selectedRow.id;
        }
        return null;
    };

    /**
     * 根据参数查询Table数据
     * @param params 参数obj类型
     */
    searchData = (params) => {
        const {url} = this.props;
        let _this = this;
        this.setState({
            loading: true
        });

        this.searchParam = params ? params : this.searchParam;//保存传入参数

        http.get(url, {
            params: {
                ...this.params,//分页信息
                ...this.searchParam//传递查询条件
            },
        }).then((data) => {
            this.setState({
                dataSource: data.records,//设置数据
                pagination: Utils.pagination(data, (current) => {//分页
                    _this.params.current = current;
                    this.searchData();
                }),
                loading: false//设置加载状态
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        });
    };

    render() {
        const {loading,dataSource,pagination,selectedRowKeys} = this.state;
        const {columns,selectRow} = this.props;
        return(
            <div>
                    {
                        loading ?
                            <Spin tip="加载中...">
                                <Table
                                    bordered//边框
                                    columns={columns}
                                    dataSource={dataSource}
                                    pagination={pagination}
                                />
                            </Spin>
                            :
                            <Table
                                bordered//边框
                                columns={columns} //显示方案
                                dataSource={dataSource} //数据
                                pagination={pagination} //分页
                                rowSelection={selectRow &&
                                    {
                                        type: selectRow,
                                        selectedRowKeys,
                                        onChange:(selectedRowKey, selectedRows)=>{
                                            // const ids = selectedRows && selectedRows.map(row => row.id);
                                            // message.success(`行键：${selectedRowKey}，行数据id：${ids}`);
                                            this.setState({
                                                selectedRows: selectedRows,
                                                selectedRowKeys:selectedRowKey
                                            })
                                        }
                                    }
                                }
                            />
                    }
            </div>
        )
    }
};