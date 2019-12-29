import React from "react";
import {Card, Form, Button, message} from "antd";
import './upload.less';
import {Avatar,PicturesWall} from "../../king_components/king_upload"


const FormItem = Form.Item;
/**
 * 上传组件
 */
class KingUpload extends React.Component{

    handlerClike = (key) => {
        const {form: {validateFields}} = this.props;
        validateFields((err,val)=>{
            if (!err) {
                message.success(val[key]);
                console.log(val[key]);
            }
        })
    };

    render() {
        const {form: {getFieldDecorator}} = this.props;

        return (
            <div>
                <Card
                    title="上传头像"
                    extra={
                        <Button
                        type="primary"
                        onClick={()=>this.handlerClike("avatar")}
                        >
                            点击获取头像id
                        </Button>
                    }
                >
                    <Form>
                        <FormItem>
                            {
                                getFieldDecorator("avatar",{
                                    initialValue:{
                                        uid: "1207143388444930049",
                                        fileName: "image-20191126212733539.png",
                                        fileSize: "147082",
                                        filePath: "http://localhost:8081/uploadFile/avatar/20191218113946/20191218113946.png",
                                        url: "http://localhost:8081/uploadFile/avatar/20191218113946/20191218113946.png",
                                        fileType: "phone",
                                        purposeType: "avatar",
                                        status: "done"
                                    }
                                })(
                                    <Avatar
                                        url="http://localhost:8081/common/file/uploadAvatar"
                                    />
                                )
                            }
                        </FormItem>
                    </Form>
                </Card>

                <Card
                    title="图片墙"
                    extra={
                        <Button
                            type="primary"
                            onClick={()=>this.handlerClike("picturesWall")}
                        >
                            获取图片墙id集合
                        </Button>
                    }
                >
                    <Form>
                        <FormItem>
                            {
                                getFieldDecorator("picturesWall",{
                                    initialValue:[{
                                        uid: "1207143388444930049",
                                        fileName: "image-20191126212733539.png",
                                        fileSize: "147082",
                                        filePath: "http://localhost:8081/uploadFile/avatar/20191218113946/20191218113946.png",
                                        url: "http://localhost:8081/uploadFile/avatar/20191218113946/20191218113946.png",
                                        fileType: "phone",
                                        purposeType: "avatar",
                                        status: "done"
                                    }]
                                })(
                                    <PicturesWall
                                        url="http://localhost:8081/common/file/uploadAvatar"
                                    />
                                )
                            }
                        </FormItem>
                    </Form>


                </Card>
            </div>
        );
    }
}

export default Form.create()(KingUpload);