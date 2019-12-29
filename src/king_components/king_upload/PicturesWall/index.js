import React from "react";
import {Upload, Icon, Modal, message} from 'antd';
import beforeUpload from "../utils/beforeUploadPhonto";

/**
 * 图片墙组件
 * 需要传入
 */
class PicturesWall extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],//当前图片的数组
        ids: [],//当前成功保存在服务器的文件集合
    };

    componentDidMount() {
        const props = this.props;
        const {onRef} = props;
        onRef && onRef(this);
        this.initializeArray(props.value || props.defaultFile || [])

    }

    //初始化数组
    initializeArray = (fileList) => {
        if (fileList && Array.isArray(fileList)) {
            this.setState({
                fileList: fileList
            })
        }

        this.createIds(fileList);//创建默认id集合
    };
    //通过文件数组创建文件id集合
    createIds = fileList => {
        const {onChange} = this.props;
        let ids = [];
        if (fileList && Array.isArray(fileList)) {
            fileList.forEach(file => {
                //文件都是成功状态
                if (file.status === 'done'){
                    if (file.response) {//新上传的文件
                        ids.push(file.response.uid);//放入id
                    }else{
                        ids.push(file.uid);//放入之前上传的文件id
                    }
                }
            });
        }
        this.setState({
            ids
        });
        onChange && onChange(ids);
    };

    //返回id集合
    getIds = () => {
        return this.state.ids;
    };

    //图片预览关闭
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        const response = file.response;
        if (response) {
            this.setState({
                previewImage: response.url,
                previewVisible: true,
            })
        }else{
            this.setState({
                previewImage: file.url,
                previewVisible: true,
            })
        }
    };

    //每次文件状态改变
    handleChange = ({fileList}) => {
        this.createIds(fileList);//每次文件改变先传给外面id
        this.setState({fileList});
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const {url} = this.props;

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">点击上传图片</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={url}//上传文件地址
                    withCredentials//携带cookie
                    listType="picture-card"
                    beforeUpload={beforeUpload}//上传之前检测文件类型
                    fileList={fileList}//文件列表，受控
                    previewFile={this.previewFile}//自定义文件预览逻辑
                    onPreview={this.handlePreview}//点击文件预览
                    onChange={this.handleChange}//每次文件状态改变的回调
                    data={{
                        type:"pictureswall"
                    }}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>


                {/* 图片点击展示 */}
                <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img
                        alt="example"
                        style={{ width: '100%' }}
                        src={previewImage} />
                </Modal>
            </div>
        );
    }
}
export default PicturesWall;