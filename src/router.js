import React from "react";
import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import App from "./App";
import Login from "./pages/login"
import Admin from "./admin";
import Buttons from './pages/ui/buttons'
import Home from "./pages/home";
import Modals from "./pages/ui/modals"
import Loadings from "./pages/ui/loadings"
import Notification from "./pages/ui/notice"
import Messages from "./pages/ui/messages"
import Tabs from "./pages/ui/tabs"
import Gallery from "./pages/ui/gallery"
import Carousel from "./pages/ui/carousel"
import NoMatch from "./pages/nomatch";
import FormLogin from "./pages/form/login";
import FormRegister from "./pages/form/register";
import BaseicTabel from "./pages/table/basicTable";
import HighTale from "./pages/table/highTable";


export default class IRouter extends React.Component{
    render() {
        return (
            <Router>
                <App>
                    <Redirect exact from="/" to='/admin/home' />
                    <Route path='/login' component={Login}/>
                    <Route path='/admin' render={()=>
                        <Admin>
                            <Switch>
                                <Route path='/admin/home' component={Home}/>
                                <Route path='/admin/ui/buttons' component={Buttons}/>
                                <Route path='/admin/ui/modals' component={Modals}/>
                                <Route path='/admin/ui/loadings' component={Loadings}/>
                                <Route path='/admin/ui/notification' component={Notification}/>
                                <Route path='/admin/ui/messages' component={Messages}/>
                                <Route path='/admin/ui/tabs' component={Tabs}/>
                                <Route path='/admin/ui/gallery' component={Gallery}/>
                                <Route path='/admin/ui/carousel' component={Carousel}/>
                                <Route path='/admin/form/login' component={FormLogin}/>
                                <Route path='/admin/form/reg' component={FormRegister}/>
                                <Route path='/admin/table/basic' component={BaseicTabel}/>
                                <Route path='/admin/table/high' component={HighTale}/>
                                <Route component={NoMatch}/>
                            </Switch>
                        </Admin>
                    }/>
                    <Route path='/order/detail' component={Login}/>
                </App>
            </Router>
        );
    }
}