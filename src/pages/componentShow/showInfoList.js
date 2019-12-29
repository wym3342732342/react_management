import React from "react";
import {Card, Carousel, Icon, List} from "antd";


export default class ShowInfoList extends React.Component{
    state = {
        content:<div>
            <Carousel
                autoplay
                style={{
                    textAlign: "center",
                    height: 240,
                    // lineHeight: 160,
                    width:"100%",
                    background: "#364d79",
                    overflow: "hidden"
                }}
            >
                <div>
                    <img alt="example" src="//img10.360buyimg.com/n7/jfs/t1/3398/4/3488/86713/5b997c05Ef8001f1a/d1cbeecd11a2ef3b.jpg"
                         style={{width:"100%"}}
                    />
                </div>
                <div>
                    <img alt="example" src="//img10.360buyimg.com/n7/jfs/t1/3398/4/3488/86713/5b997c05Ef8001f1a/d1cbeecd11a2ef3b.jpg"
                         style={{width:"100%"}}
                    />
                </div>
                <div>
                    <img alt="example" src="//img10.360buyimg.com/n7/jfs/t1/3398/4/3488/86713/5b997c05Ef8001f1a/d1cbeecd11a2ef3b.jpg"
                         style={{width:"100%"}}
                    />
                </div>
                <div>
                    <img alt="example" src="//img10.360buyimg.com/n7/jfs/t1/3398/4/3488/86713/5b997c05Ef8001f1a/d1cbeecd11a2ef3b.jpg"
                         style={{width:"100%"}}
                    />
                </div>
            </Carousel>
        </div>
    };

    render() {
        const {content} = this.state;
        return (
            <List
                className={"listInfo"}
                grid={{ gutter: 16, column: 4 }}
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Card
                            hoverable
                            bordered={false}
                            // style={{ width: 240 }}
                            cover={
                                <div style={{padding:5}}>{content}</div>
                                /*<img
                                    alt="example"
                                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                />*/
                            }
                            bodyStyle={{padding:10}}
                        >
                            <div>
                                <div style={{color:"red",fontSize:20}}>¥4399.00</div>
                                <div>
                                    <span style={{background:"#C61A2A",borderRadius: 3,color:"#fff",padding:1,fontSize:12,marginLeft:5}}>精品手机</span>
                                    <span style={{fontSize:8,marginLeft:5}}>
                                        <a href="#">京品手机Apple iPhone XR (A2108) 128GB 黑色 移动联通电信4G手机 ...详情请点击！</a>
                                    </span>
                                </div>
                                <div>
                                    <div style={{float:"left"}}>
                                        <span style={{color:"#6571AF",fontSize:12}}>207万+</span>
                                        <span style={{color:"#C4C4C4",fontSize:12}}>条评价</span>
                                    </div>
                                    <div style={{float:"right"}}>
                                        <span style={{color:"#6571AF",fontSize:12}}>二手有售</span>
                                    </div>
                                </div>
                                <div style={{clear:"both"}}>
                                    <span style={{color:"#C4C4C4",fontSize:12}}>Apple产品京东自营...</span>
                                    <Icon style={{color:"#6571AF",marginLeft:15}} type="message" />
                                </div>
                                <div>
                                    <span style={{background:"#C61A2A",borderRadius: 3,color:"#fff",padding:1,fontSize:12,margin:2}}>自营</span>
                                    <span style={{background:"#3BC09F",borderRadius: 3,color:"#fff",padding:1,fontSize:12,margin:2}}>新品</span>
                                    <span style={{borderRadius: 3,color:"#C61A2A",padding:1,fontSize:12,margin:2,border:"1px solid #C61A2A"}}>赠</span>
                                </div>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        );
    }
}
const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },{
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];