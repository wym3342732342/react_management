import React from "react";
import {Col, Row} from "antd";
import './index.less'
import Utils from '../../utils/utils'
import axios from "../../axios";

export default class Header extends React.Component{
    componentWillMount() {
        this.setState({
            userName: "YiMing"
        });
        setInterval(() => {//刷新事件
            let sysTime = Utils.formateDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000);
        this.getWeatherAPIDate();
    }

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
        return (
            <div className='header'>
                <Row className='header-top'>
                    <Col spam='24'>
                        <span>欢迎您，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>

                <Row className='breadcrumb'>
                    <Col span='4' className='breadcrumb-title'>
                        首页
                    </Col>
                    <Col span='20' className='weather'>
                        <span className='date'>{this.state.sysTime}</span>
                        <span className='weather-img'>
                            <img src={this.state.dayPicture} alt=""/>

                        </span>
                        <span className='weather-detail'>{this.state.weather}</span>
                    </Col>
                </Row>
            </div>
        );
    }
}