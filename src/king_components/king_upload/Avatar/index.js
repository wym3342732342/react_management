import {Icon, message, Upload} from "antd";
import React from "react";

/**
 * 头像上传组件，可配合Form使用。
 * 初始值可直接接受ReactFileVO即可显示默认对象
 * <b>需要：</b> url文件上传路径，由父组件传入
 */
class Avatar extends React.Component {
    state = {
        loading: false,
        currentId: ""
    };

    componentDidMount() {
        const props = this.props;
        const {onRef} = props;
        onRef && onRef(this);//将自己传给上级
        this.handleFileObj(props.value || props.defaultFile || {});
    }

    /**
     * 赋予初始值
     * @param fileObj
     */
    handleFileObj = fileObj => {
        const {onChange} = this.props;
        if (fileObj) {
            this.setState({
                currentId: fileObj.uid,
                imageUrl: fileObj.url
            });
            onChange && onChange(fileObj.uid);
        }
    };

    /**
     * 返回当前文件的id
     * @returns {string}
     */
    getCurrentId = () => {
        return this.state.currentId;
    };

    /**
     * 处理变化，每次变化将成功上传的文件id给Form
     * @param info
     */
    handleChange = ({file}) => {//不管是否显示fileList回不断的增加。每次文件返回值在 info.file.response
        if (file.status === 'uploading') {
            this.setState({ loading: true });
        }
        if (file.status === 'done' && file.response) {
            const {onChange} = this.props;
            this.setState({
                imageUrl: file.response.url,
                currentId: file.response.uid,//获取到图片id
                loading: false,
            });
            onChange && onChange(file.response.uid);//传给form
        }
        if (file.status === 'error') {
            message.error(file.response.message);
            this.setState({ loading: false });
        }
    };

    render() {
        const {loading,imageUrl} = this.state;
        const {url} = this.props;
        const uploadButton = (//上传按钮
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">点击上传头像</div>
            </div>
        );

        return (
            <Upload
                name="file"
                listType="picture-card"//上传列表的样式
                className="avatar-uploader"
                // fileList={fileList}
                withCredentials//携带cookie
                showUploadList={false}
                action={url} //上传文件地址
                beforeUpload={beforeUpload}//上传之前检测文件类型
                onChange={this.handleChange}//文件信息改变时调用
                data={{type: "avatar"}}
            >
                {
                    imageUrl
                        ?
                        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                        :
                        uploadButton}
            </Upload>
        );
    }
}

/**
 * 上传之前
 * @param file
 * @returns {boolean|boolean}
 */
function beforeUpload(file) {
    //检查图片类型
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //不是图片
    if (!isJpgOrPng) {
        message.error('用户头像只支持 jpg/png 格式！');
    }
    //判断图片大小
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('图片必须小于2MB！');
    }
    return isJpgOrPng && isLt2M;//返回是否允许上传
}

export default Avatar;