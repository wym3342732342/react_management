import React from "react";
import {Button, Card, Col, Divider, Form, Input, Modal, Row} from "antd";
import BasisTable from "../../../king_components/king_table/basisTable";
import StatisticsForm from "./component/StatisticsForm";

const FormItem = Form.Item;
class Statistics extends React.Component {
    state = {
        visible: false,
        title:"新增会员"
    };
    render() {
        const {title,visible} = this.state;
        const {form:{getFieldDecorator}} = this.props;
        const columns = [
            {
                title: '编号',//列名
                dataIndex: 'id',//数据中的名字
                key: 'id'
            },
            {
                title: '会员姓名',//列名
                dataIndex: 'userName',//数据中的名字
                key: 'userName'
            },
            {
                title: '联系方式',//列名
                dataIndex: 'phone',//数据中的名字
                key:'phone',
            },{
                title: '身份信息',//列名
                dataIndex: 'userInfo',//数据中的名字
                key:'userInfo',
            },{
                title: '住址',//列名
                dataIndex: 'address',//数据中的名字
                key:'address',
            },{
                title: '会员等级',//列名
                dataIndex: 'level',//数据中的名字
                key:'level',
            },
            {
                title: '操作',//列名
                render: (text,row) =>
                    <span>
                        <a href="javascript:void(0)">删除</a>
                        <Divider type="vertical" />
                        <a href="javascript:void(0)" onClick={()=>{this.setState({
                            visible: true,
                            title:"编辑会员"
                        })}}>编辑</a>
                    </span>

            }
        ];
        return (
            <div>
                <Card>
                    <Row>
                        <Form layout="inline">
                            <Col span={2}>
                                <FormItem>
                                    <Button type="primary" onClick={()=>{this.setState({
                                        visible: true,
                                        title:"新增会员"
                                    })}}>办理</Button>
                                </FormItem>
                            </Col>
                            <Col span={6} offset={14}>
                                <FormItem label="客户姓名">
                                    {
                                        getFieldDecorator("productName")(
                                            <Input placeholder="请输入客户姓名"/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col span={2}>
                                <FormItem>
                                    <Button type="primary">查询</Button>
                                </FormItem>
                            </Col>
                        </Form>
                    </Row>

                </Card>

                <Card style={{marginTop: "20"}}>
                    <BasisTable
                        url={'/user/page'}
                        columns={columns}
                        Ref={(table) => this.table = table}
                        selectRow="checkbox"
                    />
                </Card>
                <Modal
                    title={title}
                    visible={visible}
                    onOk={()=>{this.setState({visible:false})}}
                    onCancel={()=>{this.setState({visible:false})}}
                >
                    <StatisticsForm flag={this.state.title} />
                </Modal>
            </div>
        );
    }
}

export default Form.create()(Statistics);