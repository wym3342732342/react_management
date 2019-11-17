import React from "react";
import {Card, message, Spin, Table} from "antd";
import Axios from "../../axios";
import Utils from "../../utils/utils";
export default class HighTale extends React.Component {

    state = {
        dataSource2:[],
        loading: false
    };

    params = {
        page: 1
    };

    componentDidMount() {
        this.request();
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
        const {loading} = this.state;


        return(
            <div>
                <Card title="头部固定" style={{marginTop: "10px"}}>
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

                <Card title="左侧固定">

                </Card>
            </div>
        )
    }
};