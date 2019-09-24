import React from 'react';

export default class Child extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentWillMount() {
        console.log("WillMount");
        console.log("组件初始化之前");
    }

    componentDidMount() {
        console.log("DidMount");
        console.log("组件初始化之后我被调用");
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log("==========WillReceiveProps===========")
        console.log("父组件状态更新后，我第1个被调用")
        console.log(nextProps);
        console.log(nextContext);
        console.log("==========WillReceiveProps===========")
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate');
        console.log("父组件状态更新后，我第2个被调用")
        return true;
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillUpdate');
        console.log("父组件状态更新后，我第3个被调用")
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate');
        console.log("父组件状态更新后，我第4个被调用")
    }

    render() {
        return(
            <div>
                <p>{this.props.name}</p>
            </div>
        )
    }
}