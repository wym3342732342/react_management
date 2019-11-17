import React from 'react';
import './App.css';
import zhCH from 'antd/es/locale/zh_CN'
import {ConfigProvider} from "antd";

class App extends React.Component{
  render() {
    return (
        <ConfigProvider locale={zhCH}>
          {this.props.children}
        </ConfigProvider>
    );
  }
}

export default App;
