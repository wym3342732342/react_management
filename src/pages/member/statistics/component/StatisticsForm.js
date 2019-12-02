import {Form, Input, Row} from "antd";
import React from "react";

const FormItem = Form.Item;

class StatisticsForm extends React.Component{
    render() {
        const {form:{getFieldDecorator},flag} = this.props;
        const formLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const b = flag === '新增会员';
        return (
            <div>
                <Form layout="inline"  {...formLayout}>
                    <Row>
                        <FormItem label="会员姓名">
                            {
                                getFieldDecorator("name")(
                                    <Input placeholder="请输入会员姓名"/>
                                )
                            }
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="身份证号">
                            {
                                getFieldDecorator("numb")(
                                    <Input placeholder="请输入身份证号"/>
                                )
                            }
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="联系方式">
                            {
                                getFieldDecorator("phone")(
                                    <Input placeholder="请输入联系方式"/>
                                )
                            }
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="会员等级">
                            {
                                getFieldDecorator("lebal")(
                                    <Input placeholder="请输入会员等级"/>
                                )
                            }
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="会员住址">
                            {
                                getFieldDecorator("address")(
                                    <Input placeholder="请输入住址"/>
                                )
                            }
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem label="会员积分">
                            {
                                getFieldDecorator("integral",
                                    {
                                        initialValue:0
                                    })
                                (
                                    <Input disabled={b}/>
                                )
                            }
                        </FormItem>
                    </Row>
                </Form>
            </div>
        );
    }
}
export default Form.create()(StatisticsForm);