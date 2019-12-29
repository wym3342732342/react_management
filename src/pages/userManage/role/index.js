import React from "react";
import BasisTable from "../../../king_components/king_table/basisTable";
import {Divider, Icon, Form, Input, Button, Row, Col, Modal, message} from "antd";
import formItemLayout from '../../../king_components/king_style/formItemLayout';
import http from '../../../http';
import PopConfirmation from "../../../king_components/king_shows/PopConfirmation";
import RoleForm from "./components/roleForm";


const FormItem = Form.Item;
/**
 * 角色管理组件
 */
class Role extends React.Component{
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
        http.get("/common/role/" + id).then(data => {
            this.setState({visible: true, isEdit: true, formInfo: data});
        });
    };
    /**
     * 根据id删除
     * @param id
     */
    handlerDelete = (id) => {
        http.delete("/common/role/" + id).then(() => {
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
                const {menuIds} = values;
                //转换形式
                if (menuIds && Array.isArray(menuIds) && menuIds[0] && menuIds[0].label) {
                    values.menuIds = menuIds.map(item => item.value);
                }
                http.post("/common/role/save", values).then(() => {
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
                title: '角色名',
                dataIndex: 'roleName',
                key: 'roleName',
            },
            {
                title: '角色描述',
                dataIndex: 'description',
                key: 'description',
            },
            {
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
                                            onClick={()=>this.setState({visible:true, isEdit: false})}
                                        >新建</Button>
                                    </FormItem>
                                </Col>
                                <Col span={4} offset={15}>
                                    <FormItem label="角色名" {...formItemLayout}>
                                        {
                                            getFieldDecorator("roleName")(
                                                <Input placeholder="请输入角色名！"/>
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
                                url={"/common/role/page"}
                                // selectRow="radio"
                                onRef={(baseTable) => this.table = baseTable}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <Modal
                        visible={visible}
                        title={(isEdit?"修改":"新增") + "角色"}
                        onOk={this.handleOk}
                        onCancel={this.handlerCancel}
                        footer={[
                            <Button key="back" onClick={this.handlerCancel}>
                                返回
                            </Button>,
                            <Button key="submit" type="primary" loading={loadding} onClick={this.handleOk}>
                                保存
                            </Button>,
                        ]}
                    >
                        <RoleForm
                            onRef={(accountForm) => this.accountForm = accountForm}
                            formInfo={formInfo}
                            isEdit={isEdit}
                        />
                    </Modal>
                </div>
            </div>
        );
    }
}

export default Form.create()(Role);