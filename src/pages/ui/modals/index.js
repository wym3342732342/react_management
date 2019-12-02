import React from "react";
import {Card, Button, Radio, Modal} from "antd";
import '../ui.less';
export default class Modals extends React.Component{
    state = {
        showModel1: false,
        showModel2: false,
        showModel3: false,
        showModel4: false
    };

    handleOpen = (type) => {
        this.setState({
            [type]: true
        })
    };

    handleConfirm = (type) => {
        Modal[type]({
            title: '确认？',
            content: '你确定你学会了React了吗？',
            onOk() {
                console.log('Ok')
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    };

    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={()=>{this.handleOpen('showModel1')}}>基础模态框</Button>
                    <Button type="primary" onClick={()=>{this.handleOpen('showModel2')}}>自定义页脚</Button>
                    <Button type="primary" onClick={()=>{this.handleOpen('showModel3')}}>顶部20px弹框</Button>
                    <Button type="primary" onClick={()=>{this.handleOpen('showModel4')}}>居中弹框</Button>
                </Card>

                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>确认弹框</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>信息弹框</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>成功弹框</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>警告弹框</Button>
                </Card>

                <Modal title="基础模态框" visible={this.state.showModel1} onCancel={()=>{
                    this.setState({
                        showModel1: false
                    })
                }}>
                    <p>这是基础模态框</p>
                </Modal>

                <Modal title="自定义页脚" visible={this.state.showModel2}
                       onOk={()=>{}} onCancel={()=>{
                                        this.setState({
                                            showModel2: false
                                        });}
                       }
                    footer={[
                        <Button key="back" onClick={()=>{this.setState({showModel2: false})}}>
                            返回
                        </Button>,
                        <Button key="submit" type="primary">
                            提交
                        </Button>,
                    ]}
                >
                    <p>自定义页脚</p>
                </Modal>

                <Modal
                    title="距离上方20px"
                    style={{ top: 20 }}
                    visible={this.state.showModel3}
                    onOk={() =>{}}
                    onCancel={() => {this.setState({showModel3: false})}}
                >
                    <p>距离上方20px的模态框</p>
                </Modal>

                <Modal
                    title="垂直居中的模态对话框"
                    centered
                    visible={this.state.showModel4}
                    onOk={()=>{}}
                    onCancel={()=>{this.setState({showModel4: false})}}
                >
                    <p>垂直居中的模态对话框</p>
                </Modal>


            </div>
        );
    }
}