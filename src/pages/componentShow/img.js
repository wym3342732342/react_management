import React from "react";
import {Button, Carousel, Popover} from "antd";

export default class Img extends React.Component {
    state = {
        content:<div>
            <Carousel
                autoplay
                style={{
                    textAlign: "center",
                    height: 160,
                    lineHeight: 160,
                    width:320,
                    background: "#364d79",
                    overflow: "hidden"
                }}
            >
                <div>
                    <img alt="example" src="http://localhost:8080//uploadFile/img/20191217200833.png"
                         style={{height:"100%",width:"100%"}}
                    />
                </div>
                <div>
                    <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                         style={{height:"100%",width:"100%"}}
                    />
                </div>
                <div>
                    <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                         style={{height:"100%",width:"100%"}}
                    />
                </div>
                <div>
                    <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                         style={{height:"100%",width:"100%"}}
                    />
                </div>
            </Carousel>
        </div>
    };
    render() {
        const {content} = this.state;
        return (
            <div style={{marginTop:300}}>
                雏形
                <Popover placement="topLeft" title={null} content={content}>
                    <Button>Align edge / 边缘对齐</Button>
                </Popover>
            </div>
        );
    }
};