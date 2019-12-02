import React from "react";
import {Col, Row} from "antd";
import './index.less'
import Utils from '../../utils/utils'
import axios from "../../axios";
import http from "../../http";
import {withRouter} from "react-router-dom";

import { connect } from 'react-redux'

class Header extends React.Component{
    state = {
        userName: ""
    };
    componentWillMount() {
        setInterval(() => {//刷新事件
            let sysTime = Utils.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000);
        this.getWeatherAPIDate();
    }

    componentDidMount() {
        this.getLoginInformation();
    }

    getLoginInformation = () => {
        http.get('/stock/userInfo').then(({data}) => {
            // debugger;
            this.setState({
                userName: data.userName
            });
        });
    };

    //获取天气
    getWeatherAPIDate = () => {
        let city = '天津';
        axios.jsonp({//encodeURIComponent编码
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res) => {
            if (res.status === 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPicture:data.dayPictureUrl,
                    weather: data.weather
                })
            }
        }).catch(e=>{
            console.log(e);
        });
    };

    render() {
        const {userName} = this.state;
        const {menuType,menuName} = this.props;
        return (
            <div className='header'>
                <Row className='header-top'>
                    {
                        menuType?
                            <Col span="6" className="logo">
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span>IMooc 通用管理系统</span>
                            </Col> : ''
                    }
                    <Col span={menuType?18:24}>
                        <span>{userName&&"欢迎您，" + userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType?'':
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                {menuName}
                            </Col>
                            <Col span="20" className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-img">
                                    <img src={this.state.dayPictureUrl} alt="" />
                                </span>
                                <span className="weather-detail">
                                    {this.state.weather}
                                </span>
                            </Col>
                        </Row>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        menuName: state.menuName
    }
};

export default connect(mapStateToProps)(withRouter(Header));