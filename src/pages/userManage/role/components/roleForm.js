import React from "react";
import {Form, Input} from "antd";
import modelFormLayout from "../../../../king_components/king_style/modelFormLayout";
import {TreeSelector} from "../../../../king_components/king_select";


const FormItem = Form.Item;

class RoleForm extends React.Component{

    componentDidMount() {
        const {onRef} = this.props;
        onRef && onRef(this);
    }

    render() {
        const {form: {getFieldDecorator},formInfo} = this.props;

        return (
            <div>
                <Form>
                    <FormItem label="角色名" {...modelFormLayout}>
                        {
                            getFieldDecorator("roleName",{
                                initialValue:formInfo&&formInfo.roleName
                            })(
                                <Input placeholder="请输入角色名！"/>
                            )
                        }
                    </FormItem>

                    <FormItem label="角色描述" {...modelFormLayout}>
                        {
                            getFieldDecorator("description",{
                                initialValue: formInfo&&formInfo.description
                            })(
                                <Input.TextArea placeholder="请输入角色描述！"/>
                            )
                        }
                    </FormItem>

                    <FormItem label="角色权限" {...modelFormLayout}>
                        {
                            getFieldDecorator("menuIds",{
                                initialValue: formInfo&&formInfo.menus
                            })(
                                <TreeSelector
                                    isProcess//需要处理
                                    multiple//多选
                                    treeCheckStrictly
                                    treeDefaultExpandedKeys={['0']}
                                    indexKey="id"
                                    url="/common/menu/querySelectTree"
                                />
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(RoleForm);