import React from "react";
import {Button, Card, Checkbox, Form, Icon, Input, message} from "antd";


const FormItem = Form.Item;
class FormLogin extends React.Component{

    handleSubmit = () => {
        const {form:{getFieldsValue,validateFields}} = this.props;
        let userInfo = getFieldsValue();
        validateFields((err, values) => {
            if (!err) {
                message.success(`${userInfo.userName} 登陆成功!`)
            }
        });

    };
    render() {
        const {form:{getFieldDecorator}} = this.props;
        return (
            <div>
                <Card title="登陆行内表单">
                    <Form layout="inline">{/*指定为内连表单*/}
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登陆</Button>
                        </FormItem>
                    </Form>
                </Card>

                <Card title="登陆水平表单" style={{marginTop:"10px"}}>
                    <Form
                        layout="horizontal" style={{width:"300px"}}
                    >{/*默认就是水平方向*/}
                        <FormItem>
                            {getFieldDecorator('userName',{
                                initialValue:'yiming',/*初始值*/
                                rules:[
                                    {required:true,message:"请正确填写用户名"},
                                    {min:5,message: "长度不足5"}
                                    ]//验证规则
                            })(
                                <Input prefix={<Icon type="reddit" />} placeholder="请输入用户名" />
                            )
                            }
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('passWorld',{
                                initialValue:'123456',/*初始值*/
                                rules:[
                                    {required:true,message:"请正确填写密码"},
                                    {min:5,message:"长度必须大于5"}
                                    ]//验证规则
                            })(
                                <Input prefix={<Icon type="lock"/>} placeholder="请输入密码" />
                            )
                            }
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember',{
                                valuePropName:'checked',//默认选中
                                initialValue: true
                            })(
                                <Checkbox>记住密码</Checkbox>
                            )
                            }
                            <a href="#" style={{float:"right"}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登陆</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(FormLogin);