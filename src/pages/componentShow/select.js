import React from "react";
import {Card, message} from "antd";
import ListSelector from "../../king_components/king_select/ListSelector";
import {Form} from "antd";


const FormItem = Form.Item;

class SelectSizesDemo extends React.Component {

    handlerClick = (key) => {
        const {form:{validateFields}} = this.props;
        validateFields((err,val)=>{
            if (!err) {
                message.success(val[key].join(","));
            }
        })
    };

    render() {
        const {form:{getFieldDecorator}} = this.props;
        return (
            <div>
                <Card title="列表式多选器" extra={<a onClick={()=>this.handlerClick("listSelector")}>获取keys</a>}>
                    <div style={{width:300}}>
                        <Form>
                            <FormItem>
                                {
                                    getFieldDecorator("listSelector",{
                                        initialValue:["1207267612161507330","1207271655885864961","1207271776203669506"]
                                    })(
                                        <ListSelector
                                            url="/common/role/all"
                                            valKey="roleName"
                                            placeholder="请选择角色！"
                                            // defaultValue={["1207267612161507330","1207271655885864961","1207271776203669506"]}
                                        />
                                    )
                                }
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </div>
        );
    }
}

export default Form.create()(SelectSizesDemo);
