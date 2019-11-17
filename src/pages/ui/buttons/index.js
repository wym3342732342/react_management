import React from "react";
import {Card, Button, Radio} from "antd";
import '../ui.less';
export default class Buttons extends React.Component{

    state = {
        loading: true,
        size: "default"
    };

    handleCloseLoading = () => {
        this.setState(
            {
                loading: false
            }
        )
    };

    handleChange = (e) => {
        this.setState({
            size: e.target.value //e事件院
        })
    };

    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">主色按钮</Button>
                    <Button>默认按钮</Button>
                    <Button type="dashed">虚线按钮</Button>
                    <Button type="danger">删除按钮</Button>
                    <Button disabled={true}>按钮禁用</Button>
                </Card>

                <Card title="图形按钮" className="card-wrap">
                    <Button icon='plus'>创建</Button>
                    <Button icon='edit'>编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape="circle" />{/*shape：形状*/}
                    <Button icon="search" type="primary">搜索</Button>
                    <Button icon="download" type="primary">下载</Button>
                </Card>

                <Card title="loading按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading} />
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading} />{/*shape：形状*/}
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>

                <Card title="按钮组">
                    <Button.Group>
                        <Button icon="left" type="primary">返回</Button>
                        <Button icon="right" type="primary">前进</Button>
                    </Button.Group>
                </Card>

                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>

                    <Button type="primary" size={this.state.size}>主色按钮</Button>
                    <Button size={this.state.size}>默认按钮</Button>
                    <Button type="dashed" size={this.state.size}>虚线按钮</Button>
                    <Button type="danger" size={this.state.size}>删除按钮</Button>
                    <Button disabled={true} size={this.state.size}>按钮禁用</Button>
                </Card>
            </div>
        );
    }
}