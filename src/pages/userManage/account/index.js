import React from "react";
import BasisTable from "../../../king_components/king_table/basisTable";
import {Divider, Icon, Form, Input, Button, Row, Col, Modal, message, Tooltip, Spin} from "antd";
import formItemLayout from '../../../king_components/king_style/formItemLayout';
import AccountForm from "./components/accountForm";
import http from '../../../http';
import PopConfirmation from "../../../king_components/king_shows/PopConfirmation";
import {SlideOverDisPlayAll} from "../../../king_components/king_shows";


const FormItem = Form.Item;
/**
 * 账户管理组件
 */
class Account extends React.Component{
    state = {
        visible: false,
        loadding: false,
        isEdit: false,
        formInfo: {}
    };

    /**
     * 表格搜索
     */
    searchTable = () => {
        const {form:{validateFields}} = this.props;
        validateFields((err, values) => {
            if (!err) {
                this.table.searchData({...values});
            }
        });
    };
    /**
     * 关闭模态框，如果是修改回清空表单
     */
    handlerCancel = () => {
        const {isEdit} = this.state;
        if (isEdit) {
            const {form: {resetFields}} = this.accountForm.props;
            resetFields();
            this.setState({formInfo: {}})//清空现在的值
        }
        this.setState({visible: false});
    };

    /**
     * 修改操作
     * @param id
     */
    handlerOnEdit = (id) => {
        this.setState({loadding: true});
        http.get("/common/user/query/" + id).then(data => {
            this.setState({visible: true, isEdit: true, formInfo: data,loadding:false});
        }).catch(()=>{
            this.setState({loadding: false});
        });
    };
    /**
     * 根据id删除
     * @param id
     */
    handlerDelete = (id) => {
        http.delete("/common/user/delete/" + id).then(() => {
            message.success("删除成功！");
            this.searchTable();//刷新表格
        });
    };


    /**
     * 保存操作
     */
    handleOk = () => {
        const {form:{validateFields,resetFields}} = this.accountForm.props;
        const {formInfo} = this.state;
        validateFields((err, values) => {
            if (!err) {
                if (formInfo) {//如果是修改携带id
                    values.id = formInfo.id;
                }
                http.post("/common/user/registr", values).then(() => {
                    message.success("保存成功!");
                    //保存成功后清空表单
                    resetFields();
                    this.setState({formInfo: {},visible: false});
                    this.searchTable();
                });
            }
        });
    };

    render() {
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },{
                title: '姓名',
                dataIndex: 'realName',
                key: 'realName',
            },{
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            },{
                title: '身份',
                dataIndex: 'roleNames',
                key: 'roleNames',
                render: (text) => <SlideOverDisPlayAll displayLength="15">{text ? text.join(",") : ""}</SlideOverDisPlayAll>
            },{
                title:'操作',
                dataIndex:'id',
                key:'id',
                render: (id) => <div>
                    <a
                        onClick={() => this.handlerOnEdit(id)}
                    >
                        <Icon type="form"/>
                    </a>
                    <Divider type="vertical"/>
                    <PopConfirmation
                        onOk={() => this.handlerDelete(id)}
                        title="您确定删除吗？"
                    >
                        <a onClick={() => null}>
                            <Icon type="delete"/>
                        </a>
                    </PopConfirmation>
                </div>
            }
        ];
        const {form:{getFieldDecorator}} = this.props;
        const {visible, loadding,isEdit,formInfo} = this.state;
        return (
            <div>
                <div className={"base_crud"}>
                    <div className="base_crud_but">
                        <Form>
                            <Row>
                                <Col span={2}>
                                    <FormItem>
                                        <Button
                                            type="primary"
                                            onClick={() => this.setState({visible: true, isEdit: false})}
                                        >新建</Button>
                                    </FormItem>
                                </Col>
                                <Col span={4} offset={15}>
                                    <FormItem label="用户名" {...formItemLayout}>
                                        {
                                            getFieldDecorator("userName")(
                                                <Input placeholder="请输入用户名！"/>
                                            )
                                        }
                                    </FormItem>
                                </Col>
                                <Col span={2} style={{textAlign: "right"}}>
                                    <FormItem>
                                        <Button
                                            type="primary"
                                            onClick={this.searchTable}
                                        >
                                            查询
                                        </Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className="base_crud_table">
                        <div className="basis_table">
                            <BasisTable
                                columns={columns}
                                url={"/common/user/infoPage"}
                                // selectRow="radio"
                                onRef={(baseTable) => this.table = baseTable}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Modal
                        visible={visible}
                        title={(isEdit ? "修改" : "新增") + "账号"}
                        onOk={this.handleOk}
                        onCancel={this.handlerCancel}
                        footer={[
                            <Button key="back" onClick={this.handlerCancel}>
                                返回
                            </Button>,
                            <Button key="submit" type="primary" onClick={this.handleOk}>
                                保存
                            </Button>,
                        ]}
                    >
                        <div style={{height: "calc(100vh -10px)"}}>
                            <AccountForm
                                onRef={(accountForm) => this.accountForm = accountForm}
                                formInfo={formInfo}
                                isEdit={isEdit}
                                loadding={loadding}
                            />
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Form.create()(Account);