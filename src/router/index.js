import React from "react";
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import App from "../App";
import Login from "../pages/login"
import Admin from "../admin";
import Buttons from '../pages/ui/buttons'
import Home from "../pages/home";
import Modals from "../pages/ui/modals"
import Loadings from "../pages/ui/loadings"
import Notification from "../pages/ui/notice"
import Messages from "../pages/ui/messages"
import Tabs from "../pages/ui/tabs"
import Gallery from "../pages/ui/gallery"
import Carousel from "../pages/ui/carousel"
import NoMatch from "../pages/nomatch";
import FormLogin from "../pages/form/login";
import FormRegister from "../pages/form/register";
import BaseicTabel from "../pages/table/basicTable";
import HighTale from "../pages/table/highTable";
import Common from "../common";
import Statistics from '../pages/member/statistics'
import Permission from "../pages/permission";

export default class IRouter extends React.Component{
    render() {
        const {pageType} = this.props;
        return (
            <Router>
                <App>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path="/common" render={() =>
                            <Common>
                                {/*<Route path="/common/order/detail/:orderId" component={OrderDetail} />*/}
                            </Common>
                        }
                        />
                        <Route path='/' render={() =>
                            <Admin type={pageType}>
                                <Switch>
                                    <Route path='/home' component={Home}/>
                                    <Route path='/ui/buttons' component={Buttons}/>
                                    <Route path='/ui/modals' component={Modals}/>
                                    <Route path='/ui/loadings' component={Loadings}/>
                                    <Route path='/ui/notification' component={Notification}/>
                                    <Route path='/ui/messages' component={Messages}/>
                                    <Route path='/ui/tabs' component={Tabs}/>
                                    <Route path='/ui/gallery' component={Gallery}/>
                                    <Route path='/ui/carousel' component={Carousel}/>
                                    <Route path='/form/login' component={FormLogin}/>
                                    <Route path='/form/reg' component={FormRegister}/>
                                    <Route path='/table/basic' component={BaseicTabel}/>
                                    <Route path='/table/high' component={HighTale}/>
                                    {/*会员管理*/}
                                    <Route path='/member/statistics' component={Statistics}/>

                                    {/*权限管理*/}
                                    <Route path='/permission' component={Permission}/>

                                    <Redirect exact from="/" to='/home'/>
                                    <Route component={NoMatch}/>
                                </Switch>
                            </Admin>
                        }/>
                    </Switch>
                </App>
            </Router>
        );
    }
}