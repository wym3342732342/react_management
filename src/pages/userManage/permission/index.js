import React from "react";

import ContentLayout from "../../../king_components/king_content_layout/v1";
import {BaseSearchTree} from "../../../king_components/king_tree"
import {Button, Divider, Form, Input, message, Spin} from "antd";
import formItemLayout from '../../../king_components/king_style/formItemLayout'
import http from "../../../http";
import {TreeSelector} from "../../../king_components/king_select"
import PopConfirmation from "../../../king_components/king_shows/PopConfirmation";
const FormItem = Form.Item;

/**
 * 权限管理页面
 */
class Permission extends React.Component {

    state = {
        formModel: {},
        loading: false
    };

    /**
     * 点击新增
     */
    handlerClear = () => {
        this.setState({loading: true, formModel: {}});
        const {form:{resetFields}} = this.props;
        resetFields();
        this.setState({loading: false})
    };

    /**
     * 树点击
     * @param id
     */
    select = (id) => {
        const {form:{setFieldsValue}} = this.props;
        this.setState({loading: true,});
        if (id) {
            http.get("/common/menu/" + id).then(data => {
                setFieldsValue(data);
                this.setState({
                    formModel: data,
                    loading: false
                });
            }).catch(() => {
                this.setState({loading: false})
            });
        }else this.setState({loading: false});
    };
    /**
     * 删除事件
     */
    handlerDel = () => {
        this.setState({loading: true,});
        const {formModel} = this.state;
        if (formModel&&formModel.id) {
            http.delete("/common/menu/" + formModel.id).then(data => {
                this.searchTree.loadingTreeData();//加载树形
                this.setState({
                    loading: false
                });
            }).catch(() => {
                this.setState({loading: false})
            });
        }else {
            message.error("请您先选择一条数据！");
            this.setState({loading: false});
        }
    };
    /**
     * 保存事件
     */
    handlerSave = () => {
        this.setState({loading: true});
        const {form: {validateFields}} = this.props;
        const {formModel} = this.state;
        validateFields((err,val)=>{
            if (formModel && formModel.id) {
                val.id = formModel.id;
            }
            if (!err) {
                http.post("/common/menu/", val).then(() => {
                    this.searchTree.loadingTreeData();//加载树形
                    this.setState({loading: false});
                }).catch(() => {
                    this.setState({loading: false});
                });
            }
        })
    };

    render() {
        const {formModel,loading} = this.state;
        const {form:{getFieldDecorator}} = this.props;
        return (
            <div>
                <ContentLayout
                    siderContent={
                        <BaseSearchTree
                            showIcon
                            showSearch
                            indexKey="id"
                            title="title"
                            onSelect={(id) => this.select(id)}
                            url="/common/menu/query"
                            onRef={(searchTree) => this.searchTree = searchTree}
                        />
                    }
                >
                    <div className="king_button">
                        <Button
                            type="primary"
                            onClick={this.handlerClear}
                        >
                            新增
                        </Button>
                        <Button
                            type="primary"
                            onClick={this.handlerSave}
                        >
                            保存
                        </Button>
                        <PopConfirmation
                            title="您确定删除菜单吗？"
                            onOk={this.handlerDel}
                        >
                            <Button
                                type="danger"
                            >
                                删除
                            </Button>
                        </PopConfirmation>
                    </div>
                    <Divider orientation="right">菜单管理</Divider>
                    <Spin tip="加载中..." spinning={loading}>
                        <div className="base_form" style={{width: "50%", marginLeft: "20%"}}>
                            <Form>
                                <FormItem label="菜单名称" {...formItemLayout}>
                                    {
                                        getFieldDecorator("title", {
                                            initialValue: formModel && formModel.title
                                        })(
                                            <Input/>
                                        )
                                    }
                                </FormItem>
                                <FormItem label="菜单图标" {...formItemLayout}>
                                    {
                                        getFieldDecorator("icon", {
                                            initialValue: formModel && formModel.icon
                                        })(
                                            <Input/>
                                        )
                                    }
                                </FormItem>
                                <FormItem label="菜单路由" {...formItemLayout}>
                                    {
                                        getFieldDecorator("key", {
                                            initialValue: formModel && formModel.key
                                        })(
                                            <Input/>
                                        )
                                    }
                                </FormItem>

                                <FormItem label="菜单上级" {...formItemLayout}>
                                    {
                                        getFieldDecorator("upId", {
                                            initialValue: formModel && formModel.upId
                                        })(
                                            <TreeSelector
                                                isProcess//需要处理
                                                multiple={false}//多选
                                                treeDefaultExpandedKeys={['0']}
                                                indexKey="id"
                                                url="/common/menu/querySelectTree"
                                            />
                                        )
                                    }
                                </FormItem>
                            </Form>
                        </div>
                    </Spin>
                </ContentLayout>
            </div>

        );
    }
};

export default Form.create()(Permission);