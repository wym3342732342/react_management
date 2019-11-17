import React from "react";
import {
    Card,
    Form,
    Button,
    Input,
    Checkbox,
    Radio,
    Select,
    Switch,
    DatePicker,
    TimePicker,
    Upload,
    Icon,
    message,
    InputNumber,
} from "antd"
import formRegLayout from "../../resource/formRegLayout";
import offsetLayout from "../../resource/offsetLayout";
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const {Option} = Select;
const {TextArea} = Input;

class FormRegister extends React.Component{

    state = {
        fileList: [
            {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-2',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-3',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-4',
                name: 'image.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
            {
                uid: '-5',
                name: 'image.png',
                status: 'error',
            },
        ],
    };

    handlerSubmit = () => {
        const {form:{validateFields}} = this.props;
        validateFields((err,values)=>{
            if (!err) {
                console.log(values);
                console.log(JSON.stringify(values));//对象转成字符串
                message.success(`恭喜您注册成功${values.userName}`);
            }
        })
    };

    render() {
        const {form:{getFieldDecorator}} = this.props;
        const {fileList} = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div>
                <Card title="注册表单">
                    <Form layout="horizontal" style={{width: "350px"}}>
                        <FormItem label="用户名" {...formRegLayout}>
                            {getFieldDecorator('userName', {
                                rules: [
                                    {required: true, message: "请正确填写用户名"},
                                    {min: 5, message: "长度不足5"}
                                ]//验证规则
                            })(
                                <Input prefix={<Icon type="reddit"/>} placeholder="请输入用户名"/>
                            )
                            }
                        </FormItem>

                        <FormItem label="密码" {...formRegLayout}>
                            {getFieldDecorator('passWorld', {
                                rules: [
                                    {required: true, message: "请正确填写密码"},
                                    {min: 5, message: "长度必须大于5"}
                                ]//验证规则
                            })(
                                <Input prefix={<Icon type="lock"/>} placeholder="请输入密码"/>
                            )
                            }
                        </FormItem>

                        <FormItem label="性别" {...formRegLayout}>
                            {getFieldDecorator('sex', {
                                initialValue: '1'
                            })
                            (
                                <RadioGroup>
                                    <Radio value="1">男</Radio>
                                    <Radio value="2">女</Radio>
                                </RadioGroup>
                            )
                            }
                        </FormItem>

                        <FormItem label="年龄" {...formRegLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue: 18
                                })(
                                    <InputNumber/>
                                )
                            }
                        </FormItem>

                        <FormItem label="当前状态" {...formRegLayout}>
                            {
                                getFieldDecorator('state', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value='1'>人</Option>
                                        <Option value='2'>鬼</Option>
                                        <Option value='3'>神</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="爱好" {...formRegLayout}>
                            {
                                getFieldDecorator('interrest', {
                                    initialValue: ['1', '2', '3']
                                })(
                                    <Select mode="multiple">
                                        <Option value='1'>女人</Option>
                                        <Option value='2'>人妖</Option>
                                        <Option value='3'>。。。</Option>
                                        <Option value='4'>人</Option>
                                        <Option value='5'>1人</Option>
                                        <Option value='6'>2人</Option>
                                        <Option value='7'>男人</Option>
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem label="婚否" {...formRegLayout}>
                            {
                                getFieldDecorator('isMarryed', {
                                    valuePropName: 'checked',
                                    initialValue: false
                                })(
                                    <Switch/>
                                )
                            }
                        </FormItem>

                        <FormItem label="生日" {...formRegLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2019-1-1')
                                })(
                                    <DatePicker
                                        //showTime
                                        format="YYYY-MM-DD"
                                    />
                                )
                            }
                        </FormItem>

                        <FormItem label="详细地址" {...formRegLayout}>
                            {
                                getFieldDecorator('address', {})(
                                    <TextArea
                                        autosize={
                                            {
                                                minRows:3,
                                                maxRows:5
                                            }
                                        }
                                    />
                                )
                            }
                        </FormItem>

                        <FormItem label="早起时间" {...formRegLayout}>
                            {
                                getFieldDecorator('earlyRiseTime')(
                                    <TimePicker
                                        format="HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>

                        <FormItem label="头像" {...formRegLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        showUploadList={false}
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                )
                            }
                        </FormItem>

                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('protocol',{
                                    valuePropName: 'checked',
                                    initialValue: false
                                })(
                                    <Checkbox>以阅读<a>用户协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handlerSubmit}>注册</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(FormRegister);