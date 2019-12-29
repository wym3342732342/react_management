import React from "react";
import {Form, Input} from "antd";
import modelFormLayout from "../../../../king_components/king_style/modelFormLayout";
import ListSelector from "../../../../king_components/king_select/ListSelector";


const FormItem = Form.Item;

class AccountForm extends React.Component{

    componentDidMount() {
        const {onRef} = this.props;
        onRef && onRef(this);
    }

    render() {
        const {form: {getFieldDecorator},formInfo,isEdit} = this.props;
        return (
            <div>
                <Form>
                    <FormItem label="用户名" {...modelFormLayout}>
                        {
                            getFieldDecorator("userName",{
                                initialValue:formInfo && formInfo.username
                            })(
                                <Input disabled={isEdit} placeholder="请输入用户名！"/>
                            )
                        }
                    </FormItem>
                    {
                        !isEdit
                        &&
                        <FormItem label="密码" {...modelFormLayout}>
                            {
                                getFieldDecorator("passWord",{})(
                                    <Input placeholder="请输入密码！"/>
                                )
                            }
                        </FormItem>
                    }
                    <FormItem label="姓名" {...modelFormLayout}>
                        {
                            getFieldDecorator("realName",{
                                initialValue:formInfo&&formInfo.realName
                            })(
                                <Input placeholder="请输入真实姓名！"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="住址" {...modelFormLayout}>
                        {
                            getFieldDecorator("address",{
                                initialValue:formInfo&&formInfo.address
                            })(
                                <Input placeholder="请输入住址！"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="选择身份" {...modelFormLayout}>
                        {
                            getFieldDecorator("roleIds",{
                                initialValue: formInfo && formInfo.roleIds
                            })(
                                <ListSelector
                                    {...this.props}
                                    valKey="roleName"
                                    // defaultValue={["1207271655885864961"]}//如果以选择为以选择的角色
                                    placeholder="请选择角色"
                                    url="/common/role/all"
                                />
                            )
                        }
                    </FormItem>
                </Form>
            </div>
        );
    }
}

export default Form.create()(AccountForm);