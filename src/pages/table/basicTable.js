import React from "react";
import {Card, message, Spin, Table} from "antd";
import Axios from "../../axios";
import Utils from "../../utils/utils";
export default class BaseicTabel extends React.Component{

    state = {
        dataSource:[],
        dataSource2:[],
        loading: false,
        selectedRowKeys:[],
        selectedRowItem:null
    };

    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: "1",
                password: '2',
                sex: "3",
                state: "1"
            }, {
                id: '0',
                userName: "1",
                password: '2',
                sex: "3",
                state: "1"
            }, {
                id: '0',
                userName: "1",
                password: '2',
                sex: "3",
                state: "1"
            }, {
                id: '0',
                userName: "1",
                password: '2',
                sex: "3",
                state: "1"
            }, {
                id: '0',
                userName: "1",
                password: '2',
                sex: "3",
                state: "1"
            },
        ];
        this.setState({
            dataSource
        });
        this.request();
    }

    params = {
        page: 1
    };

    //动态表格加载
    request = () => {
        let _this = this;
        this.setState({
            loading: true
        });
        Axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                },
                //isShowLoading: true
            }
        }).then((data) => {
            this.setState({
                dataSource2: data.list,
                pagination: Utils.pagination(data, (current) => {
                    _this.params.page = current;
                    this.request();
                }),
                loading: false
            })
        }).catch(() => {
            this.setState({
                loading: false
            })
        });
    };
    //行点击时间
    clickOnRow = (record,index) => {
        this.setState({
            selectedRowKeys: [index],//必须加[]，也就是说必须是数组
            selectedRowItem: record
        })
    };

    render() {
        const columns = [
            {
                title:'id',//列名
                dataIndex:'id',//数据中的名字
                key:'id'
            },
            {
                title:'用户名',//列名
                dataIndex:'userName',//数据中的名字
                key:'userName'
            },
            {
                title:'密码',//列名
                dataIndex:'password',//数据中的名字
                key:'password'
            },
            {
                title:'性别',//列名
                dataIndex:'sex',//数据中的名字
                render(sex){
                    return sex == 1 ? "男" : "女";
                },
                key:'sex'
            },
            {
                title:'状态',//列名
                dataIndex:'state',//数据中的名字
                key:'state'
            }
        ];
        const  {selectedRowKeys,selectedRowsKeys} = this.state;//单选，复选
        const {loading} = this.state;
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered//边框
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>

                <Card title="动态数据渲染表格" style={{marginTop: "10px"}}>
                    {
                        loading ?
                            <Spin tip="加载中...">
                                <Table
                                    bordered//边框
                                    columns={columns}
                                    dataSource={this.state.dataSource2}
                                    pagination={false}
                                />
                            </Spin>
                            :
                            <Table
                                bordered//边框
                                columns={columns}
                                dataSource={this.state.dataSource2}
                                pagination={false}
                            />
                    }
                </Card>


                <Card title="Mock-单选" style={{marginTop: "10px"}}>
                    {
                        loading ?
                            <Spin tip="加载中...">
                                <Table
                                    bordered//边框
                                    columns={columns}
                                    dataSource={this.state.dataSource2}
                                    pagination={false}
                                />
                            </Spin>
                            :
                            <Table
                                bordered//边框
                                columns={columns}
                                dataSource={this.state.dataSource2}
                                pagination={false}
                                rowSelection={
                                    {
                                        type: 'radio',
                                        selectedRowKeys
                                    }
                                }
                                onRow={(record,index) => {
                                    return {
                                        onClick: () => {
                                            this.clickOnRow(record,index);
                                            message.info(`当前行id:${record.id}`);
                                        },//点击行
                                        onMouseEnter: () => {
                                            // console.log(record);
                                            // console.log(index);
                                            // message.info(`当前行id:${record.id}`);
                                        },//鼠标移入会
                                    }
                                }}
                            />
                    }
                </Card>

                <Card title="Mock-多选" style={{marginTop: "10px"}}>
                    {
                        loading ?
                            <Spin tip="加载中...">
                                <Table
                                    bordered//边框
                                    columns={columns}
                                    dataSource={this.state.dataSource2}
                                    pagination={false}
                                />
                            </Spin>
                            :
                            <Table
                                bordered//边框
                                columns={columns}
                                dataSource={this.state.dataSource2}
                                pagination={false}
                                rowSelection={
                                    {
                                        type: 'checkbox',
                                        selectedRowsKeys,
                                        onChange:(selectedRowsKeys,selectedRows)=>{//行，选中哪些行
                                            let ids = [];
                                            selectedRows.map(item => {
                                                ids.push(item.id);
                                            });
                                            this.setState({
                                                selectedRowsKeys,
                                                selectedIds:ids
                                            });
                                            console.log(ids);//打印ids
                                        }//onChange：选框点击事件
                                    }
                                }
                                onRow={(record,index) => {
                                    return {
                                        onClick: () => {
                                            //this.clickOnRow(record,index);
                                            message.info(`当前行id:${record.id}`);
                                        },//点击行
                                        onMouseEnter: () => {
                                            // console.log(record);
                                            // console.log(index);
                                            // message.info(`当前行id:${record.id}`);
                                        },//鼠标移入会
                                    }
                                }}
                            />
                    }
                </Card>

                <Card title="Mock-分页" style={{marginTop: "10px"}}>
                    {
                        loading ?
                            <Spin tip="加载中...">
                                <Table
                                    bordered//边框
                                    columns={columns}
                                    dataSource={this.state.dataSource2}
                                    pagination={false}
                                />
                            </Spin>
                            :
                            <Table
                                bordered//边框
                                columns={columns}
                                dataSource={this.state.dataSource2}
                                pagination={this.state.pagination}
                            />
                    }
                </Card>
            </div>
        );
    }
}