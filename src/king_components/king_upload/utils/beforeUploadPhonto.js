import {message} from "antd";

/**
 * 上传之前
 * @param file
 * @returns {boolean|boolean}
 */
export default function beforeUpload(file) {
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